"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useOrganization } from "@/hooks/useOrganizations";
import {
  useBudgetSummary,
  useUPSimulation,
  useUSSimulation,
  useIncomeSimulation,
  useExpenseSimulation,
  useAllocationSimulation,
  useDepreciationSummary,
} from "@/hooks/useSimulation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BudgetSummaryCard } from "@/components/simulation/BudgetSummaryCard";
import { SimulationTable } from "@/components/simulation/SimulationTable";
import { UPSimulationTable } from "@/components/simulation/UPSimulationTable";
import { USSimulationTable } from "@/components/simulation/USSimulationTable";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export default function SimulationPage({ params }: Props) {
  const { id } = use(params);
  const orgId = Number(id);

  const { data: org } = useOrganization(orgId);
  const { data: summary, isLoading: loadingSummary } = useBudgetSummary(orgId);
  const { data: up } = useUPSimulation(orgId);
  const { data: us } = useUSSimulation(orgId);
  const { data: income } = useIncomeSimulation(orgId);
  const { data: expenses } = useExpenseSimulation(orgId);
  const { data: allocation } = useAllocationSimulation(orgId);
  const { data: depreciation } = useDepreciationSummary(orgId);

  const isUnit = org?.org_type === "UNIT";

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 flex flex-wrap items-start gap-3 sm:flex-nowrap sm:items-center">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/organizations/${orgId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Simulasi Anggaran</h1>
          {org && (
            <p className="text-sm text-muted-foreground">
              {org.name} — {org.org_type}
            </p>
          )}
        </div>
      </div>

      {loadingSummary ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      ) : summary ? (
        <div className="mb-6">
          <BudgetSummaryCard summary={summary} />
        </div>
      ) : null}

      <Tabs defaultValue={isUnit ? "up" : "allocation"}>
        <TabsList className="mb-4 flex-wrap h-auto gap-1">
          {isUnit && (
            <>
              <TabsTrigger value="up">Uang Pangkal</TabsTrigger>
              <TabsTrigger value="us">Uang Sekolah</TabsTrigger>
            </>
          )}
          <TabsTrigger value="income">Pendapatan</TabsTrigger>
          <TabsTrigger value="expenses">Biaya</TabsTrigger>
          {!isUnit && (
            <TabsTrigger value="allocation">Kontribusi</TabsTrigger>
          )}
          <TabsTrigger value="depreciation">Depresiasi</TabsTrigger>
        </TabsList>

        {isUnit && (
          <>
            <TabsContent value="up">
              {up ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Simulasi Uang Pangkal
                    </CardTitle>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        Siswa baru: <strong>{formatNumber(up.new_student_count)}</strong>
                        {" — "}
                        Tarif UP: <strong>{formatCurrency(up.final_up_rate)}</strong> / siswa
                      </p>
                      {up.new_investment_dep > 0 && (
                        <p>Depresiasi investasi baru: <strong>{formatCurrency(up.new_investment_dep)}</strong></p>
                      )}
                      {up.old_asset_dep > 0 && (
                        <p>Depresiasi aset lama: <strong>{formatCurrency(up.old_asset_dep)}</strong></p>
                      )}
                      {up.parent_allocated_old_asset_dep > 0 && (
                        <p>
                          Depresiasi aset lama Cabang/Pusat:{" "}
                          <strong>{formatCurrency(up.parent_allocated_old_asset_dep)}</strong>
                        </p>
                      )}
                      {up.parent_allocated_up_cost > 0 && (
                        <p>
                          Alokasi biaya dari Cabang/Pusat:{" "}
                          <strong>{formatCurrency(up.parent_allocated_up_cost)}</strong>
                        </p>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <UPSimulationTable
                      components={up.components}
                      allocatedComponents={up.allocated_components}
                      newStudentCount={up.new_student_count}
                      totalOwnCost={up.total_up_cost - up.parent_allocated_up_cost}
                      newInvestmentDep={up.new_investment_dep}
                      oldAssetDep={up.old_asset_dep}
                      parentAllocatedOldAssetDep={up.parent_allocated_old_asset_dep}
                      totalUpCostWithDep={up.total_up_cost_with_dep}
                      finalUpRate={up.final_up_rate}
                    />
                  </CardContent>
                </Card>
              ) : (
                <Alert>
                  <AlertDescription>Data UP tidak tersedia untuk organisasi ini.</AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="us">
              {us ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Simulasi Uang Sekolah
                    </CardTitle>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        Total siswa: <strong>{formatNumber(us.total_students)}</strong>
                        {" — "}
                        Tarif US: <strong>{formatCurrency(us.final_us_rate)}</strong> / siswa / bulan
                      </p>
                      {us.parent_allocated_us_cost > 0 && (
                        <p>
                          Alokasi biaya dari Cabang/Pusat:{" "}
                          <strong>{formatCurrency(us.parent_allocated_us_cost)}</strong>
                        </p>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <USSimulationTable
                      components={us.components}
                      allocatedComponents={us.allocated_components}
                      totalStudents={us.total_students}
                      totalOwnCost={us.total_us_cost - us.parent_allocated_us_cost}
                      totalUsCost={us.total_us_cost}
                      finalUsRate={us.final_us_rate}
                    />
                  </CardContent>
                </Card>
              ) : (
                <Alert>
                  <AlertDescription>Data US tidak tersedia untuk organisasi ini.</AlertDescription>
                </Alert>
              )}
            </TabsContent>
          </>
        )}

        <TabsContent value="income">
          {income ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Simulasi Pendapatan</CardTitle>
              </CardHeader>
              <CardContent>
                <SimulationTable
                  rows={income.items}
                  totalLabel="Total Pendapatan"
                  totalAmount={income.total}
                />
              </CardContent>
            </Card>
          ) : (
            <Skeleton className="h-48 w-full" />
          )}
        </TabsContent>

        <TabsContent value="expenses">
          {expenses ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Simulasi Biaya</CardTitle>
              </CardHeader>
              <CardContent>
                <SimulationTable
                  rows={[...expenses.operational, ...expenses.non_operational]}
                  totalLabel="Total Biaya"
                  totalAmount={expenses.total}
                />
              </CardContent>
            </Card>
          ) : (
            <Skeleton className="h-48 w-full" />
          )}
        </TabsContent>

        {!isUnit && (
          <TabsContent value="allocation">
            {allocation ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Alokasi Kontribusi</CardTitle>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>
                      Total biaya US: <strong>{formatCurrency(allocation.total_base_cost_us)}</strong>
                      {" — "}
                      Total biaya UP: <strong>{formatCurrency(allocation.total_base_cost_up)}</strong>
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <SimulationTable
                    rows={allocation.units.map((unit) => ({
                      account_code: `${(unit.pct_us * 100).toFixed(1)}%`,
                      description: unit.from_organization_name,
                      amount: unit.contribution_us + unit.contribution_up,
                    }))}
                    totalLabel="Total Kontribusi"
                    totalAmount={allocation.total_contribution_us + allocation.total_contribution_up}
                  />
                </CardContent>
              </Card>
            ) : (
              <Skeleton className="h-48 w-full" />
            )}
          </TabsContent>
        )}

        <TabsContent value="depreciation">
          {depreciation ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Ringkasan Depresiasi</CardTitle>
              </CardHeader>
              <CardContent>
                <SimulationTable
                  rows={depreciation.items.map((item) => ({
                    account_code: item.asset_code ?? undefined,
                    description: `${item.asset_name} (${item.source === "new" ? "Baru" : "Lama"})`,
                    amount: item.current_year_dep,
                  }))}
                  totalLabel="Total Depresiasi"
                  totalAmount={depreciation.total_current_year_dep}
                />
              </CardContent>
            </Card>
          ) : (
            <Skeleton className="h-48 w-full" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
