"use client";
import { useEffect, useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, XCircle, FileText, Info } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminDashboard() {
  const { businesses, fetchBusinesses, updateBusinessStatus, loading, error } =
    useAdminStore();

  const [rejectingBusinessId, setRejectingBusinessId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2">Loading businesses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Business Verification Dashboard
      </h1>

      {businesses.length === 0 ? (
        <p className="text-center text-gray-500">No businesses to verify.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((b) => (
            <Card
              key={b.id}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-lg">
                  <span className="truncate">{b.companyName || "Unnamed"}</span>
                  {b.status === "VERIFIED" ? (
                    <Badge variant="default" className="bg-green-500">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Verified
                    </Badge>
                  ) : b.status === "REJECTED" ? (
                    <Badge variant="destructive">
                      <XCircle className="h-4 w-4 mr-1" />
                      Rejected
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <Info className="h-4 w-4 mr-1" />
                      Pending
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-3 text-sm text-gray-700">
                  {/* GST */}
                  <div className="flex justify-between items-center">
                    <span>
                      <strong>GST:</strong>{" "}
                      {b.gstNumber || (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </span>
                    {b.gstCertificateUrl && (
                      <a
                        href={b.gstCertificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </a>
                    )}
                  </div>

                  {/* PAN */}
                  <div className="flex justify-between items-center">
                    <span>
                      <strong>PAN:</strong>{" "}
                      {b.panNumber || (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </span>
                    {b.panDocumentUrl && (
                      <a
                        href={b.panDocumentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        View
                      </a>
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <strong>Type:</strong> {b.businessType || "N/A"}
                  </div>
                  <div>
                    <strong>Founded:</strong> {b.foundedYear || "N/A"}
                  </div>

                  {/* Rejection Reason */}
                  {b.status === "REJECTED" && b.rejectionReason && (
                    <div className="text-red-600 text-sm mt-2">
                      <strong>Rejection Reason:</strong> {b.rejectionReason}
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="mt-6 space-y-3">
                  {b.status === "VERIFIED" ? (
                    <Button
                      onClick={() => updateBusinessStatus(b.id, "UNVERIFY")}
                      className="w-full bg-yellow-500 hover:bg-yellow-600"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Unverify Business
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => updateBusinessStatus(b.id, "VERIFY")}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Verify Business
                      </Button>

                      {rejectingBusinessId === b.id ? (
                        <div className="space-y-2 mt-3">
                          <Input
                            placeholder="Enter rejection reason..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                          />
                          <Button
                            onClick={() => {
                              if (rejectionReason.trim()) {
                                updateBusinessStatus(
                                  b.id,
                                  "REJECT",
                                  rejectionReason
                                );
                                setRejectingBusinessId(null);
                                setRejectionReason("");
                              }
                            }}
                            className="w-full bg-red-500 hover:bg-red-600"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Confirm Rejection
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => setRejectingBusinessId(b.id)}
                          variant="outline"
                          className="w-full"
                        >
                          Reject Business
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
