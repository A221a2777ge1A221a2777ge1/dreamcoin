import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="font-headline mt-4">Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The admin panel for managing rewards and users is coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
