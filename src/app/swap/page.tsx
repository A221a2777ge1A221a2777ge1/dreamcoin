import { SwapForm } from "@/components/swap/swap-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SwapPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Swap Tokens</CardTitle>
          <CardDescription>Instantly swap tokens for DreamCoin (DRC)</CardDescription>
        </CardHeader>
        <CardContent>
          <SwapForm />
        </CardContent>
      </Card>
    </div>
  );
}
