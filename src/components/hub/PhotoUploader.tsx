import { useState, useCallback } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PhotoUploaderProps {
  hubSlug: string;
  onUploadComplete: () => void;
}

const PhotoUploader = ({ hubSlug, onUploadComplete }: PhotoUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const { toast } = useToast();

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter(f => f.type.startsWith("image/"));
    if (fileArray.length === 0) return;

    setUploading(true);
    let successCount = 0;

    for (const file of fileArray) {
      const ext = file.name.split(".").pop();
      const path = `${hubSlug}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: storageError } = await supabase.storage
        .from("hub-photos")
        .upload(path, file);

      if (storageError) {
        console.error("Upload error:", storageError);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("hub-photos")
        .getPublicUrl(path);

      // Get current max sort_order
      const { data: existing } = await supabase
        .from("hub_photos" as any)
        .select("sort_order")
        .eq("hub_slug", hubSlug)
        .order("sort_order", { ascending: false })
        .limit(1);

      const nextOrder = (existing && existing.length > 0 ? (existing[0] as any).sort_order : 0) + 1 + successCount;

      const { error: dbError } = await supabase
        .from("hub_photos" as any)
        .insert({
          hub_slug: hubSlug,
          image_url: urlData.publicUrl,
          sort_order: nextOrder,
        } as any);

      if (!dbError) successCount++;
    }

    setUploading(false);
    if (successCount > 0) {
      toast({ title: `${successCount} photo${successCount > 1 ? "s" : ""} uploaded` });
      onUploadComplete();
    }
  }, [hubSlug, onUploadComplete, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files);
  }, [uploadFiles]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-sm p-8 text-center transition-colors ${
        dragOver ? "border-impact-blue bg-impact-blue/5" : "border-border"
      }`}
    >
      {uploading ? (
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Uploading...</span>
        </div>
      ) : (
        <>
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag & drop photos here, or click to browse
          </p>
          <label className="btn-primary text-xs cursor-pointer inline-block">
            Choose Files
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && uploadFiles(e.target.files)}
            />
          </label>
        </>
      )}
    </div>
  );
};

export default PhotoUploader;
