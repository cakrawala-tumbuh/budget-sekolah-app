"use client";

import Link from "next/link";
import { Building2, ChevronRight, Lock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, ORG_TYPE_LABEL } from "@/lib/utils";
import type { Organization } from "@/lib/types";

interface OrganizationCardProps {
  org: Organization;
  onDelete?: (id: number) => void;
}

const ORG_TYPE_STYLE: Record<string, string> = {
  UNIT: "border-l-4 border-l-blue-500",
  CABANG: "border-l-4 border-l-amber-500",
  PUSAT: "border-l-4 border-l-green-500",
};

const ORG_TYPE_BADGE: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  UNIT: "secondary",
  CABANG: "default",
  PUSAT: "outline",
};

export function OrganizationCard({ org, onDelete }: OrganizationCardProps) {
  return (
    <Card className={cn("transition-shadow hover:shadow-md", ORG_TYPE_STYLE[org.org_type])}>
      <CardContent className="pt-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3">
            <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
            <div>
              <p className="font-semibold text-sm leading-tight">{org.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{org.code}</p>
              {org.city && (
                <p className="text-xs text-muted-foreground">{org.city}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Badge variant={ORG_TYPE_BADGE[org.org_type]}>
              {ORG_TYPE_LABEL[org.org_type] ?? org.org_type}
            </Badge>
            {org.is_locked && (
              <Badge variant="destructive" className="gap-1 text-xs">
                <Lock className="h-3 w-3" />
                Terkunci
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2 pt-0">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <Link href={`/organizations/${org.id}`}>
            <ChevronRight className="h-3.5 w-3.5" />
            Detail
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/organizations/${org.id}/simulation`}>
            <TrendingUp className="h-3.5 w-3.5" />
            Simulasi
          </Link>
        </Button>
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => {
              if (window.confirm(`Hapus organisasi "${org.name}"?`)) {
                onDelete(org.id);
              }
            }}
          >
            Hapus
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
