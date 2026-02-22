import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PhotoUploader from "./PhotoUploader";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Photo {
  id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
}

const placeholderPhotos: Photo[] = [
  { id: "p1", image_url: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&h=400&fit=crop", caption: "Community gathering", sort_order: 1 },
  { id: "p2", image_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop", caption: "Workshop session", sort_order: 2 },
  { id: "p3", image_url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop", caption: "Event celebration", sort_order: 3 },
  { id: "p4", image_url: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&h=400&fit=crop", caption: "Team collaboration", sort_order: 4 },
  { id: "p5", image_url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop", caption: "Networking session", sort_order: 5 },
  { id: "p6", image_url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop", caption: "Volunteer day", sort_order: 6 },
];

interface PhotoGalleryProps {
  hubSlug: string;
}

const PhotoGallery = ({ hubSlug }: PhotoGalleryProps) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from("hub_photos" as any)
      .select("*")
      .eq("hub_slug", hubSlug)
      .order("sort_order", { ascending: true });

    if (!error && data && data.length > 0) {
      setPhotos(data as any as Photo[]);
    } else {
      setPhotos(placeholderPhotos);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, [hubSlug]);

  return (
    <div className="space-y-6">
      {isLoggedIn && (
        <PhotoUploader hubSlug={hubSlug} onUploadComplete={fetchPhotos} />
      )}

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[3/2] bg-muted animate-pulse rounded-sm" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setLightboxPhoto(photo)}
              className="group relative aspect-[3/2] overflow-hidden rounded-sm bg-muted"
            >
              <img
                src={photo.image_url}
                alt={photo.caption || "Hub photo"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {photo.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs">{photo.caption}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Dialog open={!!lightboxPhoto} onOpenChange={() => setLightboxPhoto(null)}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none">
          {lightboxPhoto && (
            <div className="relative">
              <img
                src={lightboxPhoto.image_url}
                alt={lightboxPhoto.caption || "Hub photo"}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              {lightboxPhoto.caption && (
                <p className="text-white/80 text-sm p-4 text-center">{lightboxPhoto.caption}</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotoGallery;
