
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaginationContent, PaginationItem, PaginationLink, Pagination } from "@/components/ui/pagination";
import { indianCrimeData } from "@/data/indian-crime-data";
import { useState } from "react";

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(indianCrimeData.length / itemsPerPage);
  
  const currentData = indianCrimeData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Crime Reports Database</h2>
          <p className="text-muted-foreground">
            Interactive training data from Indian crime records
          </p>
        </div>

        <div className="grid gap-4">
          {currentData.map((record) => (
            <Card key={record.id} className="hover:bg-accent/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex justify-between">
                  <span>{record.type}</span>
                  <span className="text-sm text-muted-foreground">{record.date}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 text-sm">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <span className="text-muted-foreground">Location:</span>
                      <p>{record.location}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">District:</span>
                      <p>{record.district}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">State:</span>
                      <p>{record.state}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <p className={record.status === "Solved" ? "text-green-600" : "text-amber-600"}>
                        {record.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-muted-foreground">Description:</span>
                    <p className="mt-1">{record.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Pagination>
          <PaginationContent>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
