"use client";

import { useState, useRef } from "react";
import { useBusinessStore } from "@/store/useBusinessStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, FileText, AlertTriangle } from "lucide-react";

export default function ReuploadDocumentsDialog() {
  const { reuploadDocuments, loading, businessProfileDetails } =
    useBusinessStore();

  const [gstFile, setGstFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [gstNumber, setGstNumber] = useState(
    businessProfileDetails?.businessProfile?.gstNumber || ""
  );
  const [panNumber, setPanNumber] = useState(
    businessProfileDetails?.businessProfile?.panNumber || ""
  );

  const [open, setOpen] = useState(false);

  const gstInputRef = useRef(null);
  const panInputRef = useRef(null);

  const status = businessProfileDetails?.businessProfile?.status ?? null;
  const rejectionReason =
    businessProfileDetails?.businessProfile?.rejectionReason ?? null;

  if (!businessProfileDetails?.businessProfile) return null;
  if (status !== "REJECTED") return null;

  const handleSubmit = async () => {
    if (!gstFile && !panFile && !gstNumber && !panNumber) return;

    if (!gstNumber.trim() || !panNumber.trim()) {
      alert("GST number and PAN number are required");
      return;
    }

    await reuploadDocuments(gstFile, panFile, gstNumber, panNumber);
    setGstFile(null);
    setPanFile(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full justify-start bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-colors">
          <FileText className="mr-2 h-4 w-4" />
          Re-upload Documents
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-red-600">
            Re-upload Business Documents
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {rejectionReason && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <p className="text-sm">{rejectionReason}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">GST Number</label>
            <Input
              type="text"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              placeholder="Enter GST Number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              GST Certificate
            </label>
            <Input
              type="file"
              accept="application/pdf,image/*"
              ref={gstInputRef}
              onChange={(e) => setGstFile(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">PAN Number</label>
            <Input
              type="text"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value)}
              placeholder="Enter PAN Number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              PAN Document
            </label>
            <Input
              type="file"
              accept="application/pdf,image/*"
              ref={panInputRef}
              onChange={(e) => setPanFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={handleSubmit}
            disabled={
              loading || (!gstFile && !panFile && !gstNumber && !panNumber)
            }
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Submit Documents
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
