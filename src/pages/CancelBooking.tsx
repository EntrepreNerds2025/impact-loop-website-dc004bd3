import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { formatBookingDateTime } from "@/lib/booking";

type CancelBookingRecord = {
  id: string;
  full_name: string;
  email: string;
  call_type_label?: string;
  scheduled_at?: string | null;
  status: string;
};

const CancelBooking = () => {
  const { token = "" } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const [booking, setBooking] = useState<CancelBookingRecord | null>(null);
  const [cancelled, setCancelled] = useState(false);

  const loadBooking = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("cancel-booking", {
        body: { cancel_token: token, preview: true },
      });

      if (error) throw new Error(error.message || "Could not load booking.");
      if (!data?.booking) throw new Error("Booking not found.");

      setBooking(data.booking);
      setCancelled(data.booking.status === "cancelled");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Failed to load booking.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBooking();
  }, [token]);

  const handleCancel = async () => {
    if (!token) return;
    setIsCancelling(true);
    try {
      const { data, error } = await supabase.functions.invoke("cancel-booking", {
        body: { cancel_token: token },
      });
      if (error) throw new Error(error.message || "Unable to cancel booking.");
      if (!data?.booking) throw new Error("Cancellation response missing booking data.");
      setBooking(data.booking);
      setCancelled(true);
      toast.success("Booking cancelled.");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Could not cancel booking.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-16 section-dark">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-impact-blue text-xs uppercase tracking-widest mb-4">Cancel Booking</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-5">Manage your booking</h1>
          <p className="text-white/70">Confirm if you want to cancel this scheduled call.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          {isLoading ? (
            <div className="border border-border rounded-lg p-6">Loading booking...</div>
          ) : !booking ? (
            <div className="border border-border rounded-lg p-6 space-y-4">
              <p className="text-muted-foreground">We couldn't find this booking token.</p>
              <Link to="/bookings" className="btn-primary inline-flex">
                Book a New Call
              </Link>
            </div>
          ) : (
            <div className="border border-border rounded-lg p-6 space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Booking details</p>
                <p className="font-serif text-2xl text-foreground mb-1">{booking.call_type_label || "Impact Loop Call"}</p>
                {booking.scheduled_at ? (
                  <p className="text-sm text-muted-foreground">{formatBookingDateTime(booking.scheduled_at)}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">No schedule found.</p>
                )}
              </div>

              {cancelled ? (
                <div className="space-y-4">
                  <p className="text-green-700 bg-green-500/10 border border-green-500/30 rounded-md px-4 py-3 text-sm">
                    Your booking has been cancelled.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/bookings" className="btn-primary">Book a New Call</Link>
                    {token && <Link to={`/booking/reschedule/${token}`} className="btn-secondary">Reschedule Instead</Link>}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Are you sure you want to cancel this booking? This action will remove the calendar event.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="btn-primary !bg-red-600 hover:!bg-red-700"
                      onClick={handleCancel}
                      disabled={isCancelling}
                    >
                      {isCancelling ? "Cancelling..." : "Yes, Cancel Booking"}
                    </button>
                    {token && <Link to={`/booking/reschedule/${token}`} className="btn-secondary">Reschedule Instead</Link>}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CancelBooking;
