"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, Settings } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const tokens = [
  { symbol: "BNB", name: "Binance Coin" },
  { symbol: "USDT", name: "Tether" },
  { symbol: "BUSD", name: "Binance USD" },
];

export function SwapForm() {
  const [slippage, setSlippage] = useState("0.5");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const isConnected = false;

  const handleAmountChange = (value: string) => {
    setFromAmount(value);
    // Mock conversion rate
    const amount = parseFloat(value);
    if (!isNaN(amount)) {
      setToAmount((amount * 2400).toString());
    } else {
      setToAmount("");
    }
  };


  return (
    <div className="space-y-4">
      <Card className="bg-secondary/50">
        <CardContent className="p-4 space-y-2">
          <Label htmlFor="from-token">You Pay</Label>
          <div className="flex gap-2">
            <Input 
              id="from-token" 
              type="number"
              placeholder="0.0" 
              className="text-2xl h-12 flex-1"
              value={fromAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
            />
            <Select defaultValue="BNB">
              <SelectTrigger className="w-[120px] h-12">
                <SelectValue placeholder="Token" />
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    {token.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="relative flex justify-center">
         <Button variant="outline" size="icon" className="z-10 bg-background h-10 w-10 border-2">
            <ArrowDown className="h-5 w-5" />
        </Button>
      </div>

      <Card className="bg-secondary/50 -mt-7">
        <CardContent className="p-4 pt-7 space-y-2">
          <Label htmlFor="to-token">You Receive</Label>
          <div className="flex gap-2">
            <Input 
              id="to-token" 
              type="number"
              placeholder="0.0" 
              className="text-2xl h-12 flex-1"
              value={toAmount}
              readOnly
            />
             <Select defaultValue="DRC" disabled>
              <SelectTrigger className="w-[120px] h-12">
                <SelectValue placeholder="DRC" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRC">
                    DRC
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>Slippage Tolerance</span>
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-1">
              {slippage}% <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Slippage Tolerance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={slippage} onValueChange={setSlippage}>
                <DropdownMenuRadioItem value="0.5">0.5%</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="1">1.0%</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2">2.0%</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

       <div className="text-sm text-muted-foreground space-y-1">
        <div className="flex justify-between">
            <span>Price Impact</span>
            <span>~0.02%</span>
        </div>
         <div className="flex justify-between">
            <span>Estimated Gas</span>
            <span>~0.001 BNB</span>
        </div>
      </div>

      {isConnected ? (
        <Button size="lg" className="w-full text-lg h-12">Swap</Button>
      ) : (
        <Button size="lg" className="w-full text-lg h-12">Connect Wallet</Button>
      )}
    </div>
  );
}
