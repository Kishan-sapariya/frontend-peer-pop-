"use client";

import { useEffect, useMemo, useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Loader2,
  Mail,
  Search,
  Users,
  Send,
  Eye,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const ROLE_OPTIONS = [
  { value: "all", label: "All roles" },
  { value: "CREATOR", label: "Creators" },
  { value: "BUSINESS", label: "Businesses" },
];

const LINK_STYLE = {
  color: "#a16207",
  fontWeight: 600,
  textDecoration: "underline",
};

// Mirror the backend linkifier: [label](url) -> link with custom text,
// bare http(s) URLs -> clickable link. Returns an array of React nodes.
function linkifyToNodes(text) {
  const nodes = [];
  const regex = /\[([^\]\n]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s]+)/g;
  let last = 0;
  let key = 0;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] && m[2]) {
      nodes.push(
        <a key={key++} href={m[2]} target="_blank" rel="noreferrer" style={LINK_STYLE}>
          {m[1]}
        </a>
      );
    } else {
      const raw = m[3];
      const trailing = (raw.match(/[.,;:!?]+$/) || [""])[0];
      const clean = raw.slice(0, raw.length - trailing.length);
      nodes.push(
        <a key={key++} href={clean} target="_blank" rel="noreferrer" style={LINK_STYLE}>
          {clean}
        </a>
      );
      if (trailing) nodes.push(trailing);
    }
    last = regex.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

// Mirror the backend template's paragraph rendering: blank lines split
// paragraphs, single newlines become line breaks. React escapes text for us.
function renderParagraphs(text, style) {
  const trimmed = (text || "").trim();
  if (!trimmed) return null;
  return trimmed.split(/\n{2,}/).map((para, i) => {
    const lines = para.split("\n");
    return (
      <p key={i} style={{ margin: "0 0 16px", ...style }}>
        {lines.map((line, j) => (
          <span key={j}>
            {linkifyToNodes(line)}
            {j < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
}

// Faithful visual preview of the email the recipient will receive.
function EmailPreview({ greetingName, subject, message, regards }) {
  return (
    <div
      style={{
        background: "#f4f4f5",
        padding: 24,
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid #eeeeee",
        }}
      >
        {/* Header */}
        <div
          style={{ background: "#facc15", padding: "22px 32px", textAlign: "center" }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 800,
              color: "#111111",
              letterSpacing: "0.5px",
            }}
          >
            Peerpop
          </h1>
        </div>
        {/* Body */}
        <div style={{ padding: 32, color: "#1f2937", fontSize: 15, lineHeight: 1.7 }}>
          <p style={{ margin: "0 0 20px" }}>Hi {greetingName || "there"},</p>
          {subject?.trim() && (
            <h2
              style={{
                margin: "0 0 18px",
                fontSize: 21,
                color: "#111111",
                fontWeight: 800,
                lineHeight: 1.35,
              }}
            >
              {subject}
            </h2>
          )}
          {message?.trim() ? (
            renderParagraphs(message)
          ) : (
            <p style={{ margin: "0 0 16px", color: "#9ca3af" }}>
              Your message will appear here…
            </p>
          )}
          {regards?.trim() && (
            <div
              style={{
                margin: "28px 0 0",
                paddingTop: 20,
                borderTop: "1px solid #eeeeee",
                color: "#374151",
              }}
            >
              {renderParagraphs(regards)}
            </div>
          )}
        </div>
        {/* Footer */}
        <div style={{ background: "#111111", padding: "18px 32px", textAlign: "center" }}>
          <p style={{ margin: 0, color: "#9ca3af", fontSize: 12 }}>
            © {new Date().getFullYear()} Peerpop · Where creators meet opportunity
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SendEmailTab() {
  const {
    recipients,
    recipientsLoading,
    fetchRecipients,
    sendBulkEmail,
    sendingEmail,
  } = useAdminStore();

  const [selected, setSelected] = useState(() => new Set());
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [regards, setRegards] = useState("Regards,\nTeam Peerpop");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  useEffect(() => {
    fetchRecipients();
  }, [fetchRecipients]);

  // Client-side filter over the loaded recipient list
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return recipients.filter((r) => {
      if (roleFilter !== "all" && r.role !== roleFilter) return false;
      if (!q) return true;
      return (
        r.username?.toLowerCase().includes(q) ||
        r.email?.toLowerCase().includes(q)
      );
    });
  }, [recipients, search, roleFilter]);

  const verifiedInView = useMemo(
    () => filtered.filter((r) => r.emailVerified),
    [filtered]
  );

  const selectedRecipients = useMemo(
    () => recipients.filter((r) => selected.has(r.id)),
    [recipients, selected]
  );

  const greetingName = selectedRecipients[0]?.username || "";

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAllVerified = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      verifiedInView.forEach((r) => next.add(r.id));
      return next;
    });
  };

  const clearSelection = () => setSelected(new Set());

  const canSend =
    selected.size > 0 && subject.trim() && message.trim() && !sendingEmail;

  const handleSend = async () => {
    setConfirmOpen(false);
    const result = await sendBulkEmail({
      userIds: [...selected],
      subject,
      message,
      regards,
    });
    if (result?.success) {
      setLastResult(result);
      // Reset composition but keep the recipient list handy
      setSubject("");
      setMessage("");
      clearSelection();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ---------- Composer ---------- */}
      <div className="space-y-6">
        {/* Recipients */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-yellow-600" />
              Recipients
              <Badge className="ml-auto bg-yellow-100 text-yellow-800 border-0">
                {selected.size} selected
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search name or email"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-9 border-gray-200"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="h-9 w-full sm:w-40 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLE_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={selectAllVerified}
                disabled={verifiedInView.length === 0}
                className="h-7 px-2.5 border-yellow-200 bg-yellow-50 text-yellow-800 hover:bg-yellow-100"
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                Select all verified ({verifiedInView.length})
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={clearSelection}
                disabled={selected.size === 0}
                className="h-7 px-2.5 text-gray-500 hover:text-gray-800"
              >
                Clear
              </Button>
            </div>

            <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto divide-y divide-gray-100">
              {recipientsLoading ? (
                <div className="flex items-center justify-center py-10 text-gray-400">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-10 text-center text-sm text-gray-400">
                  No users match your filters
                </div>
              ) : (
                filtered.map((r) => (
                  <label
                    key={r.id}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-yellow-50/50 cursor-pointer"
                  >
                    <Checkbox
                      checked={selected.has(r.id)}
                      onCheckedChange={() => toggleOne(r.id)}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {r.username}
                        </span>
                        {r.emailVerified ? (
                          <Badge className="bg-green-100 text-green-700 border-0 text-[10px] px-1.5">
                            Verified
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-500 border-0 text-[10px] px-1.5">
                            Unverified
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{r.email}</p>
                    </div>
                  </label>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Message */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-yellow-600" />
              Compose
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="subject" className="text-sm text-gray-700">
                Subject <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subject"
                placeholder="e.g. A new feature just launched on Peerpop"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border-gray-200"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-sm text-gray-700">
                Message <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="message"
                placeholder="Write your message here. Leave a blank line between paragraphs."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                className="border-gray-200 resize-y"
              />
              <p className="text-xs text-gray-400">
                Plain text. Blank lines start a new paragraph. Paste a link to
                make it clickable, or write{" "}
                <code className="text-[11px] bg-gray-100 text-gray-600 px-1 py-0.5 rounded">
                  [click here](https://…)
                </code>{" "}
                for custom link text.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="regards" className="text-sm text-gray-700">
                Regards / closing
              </Label>
              <Textarea
                id="regards"
                placeholder="Regards,&#10;Team Peerpop"
                value={regards}
                onChange={(e) => setRegards(e.target.value)}
                rows={2}
                className="border-gray-200 resize-y"
              />
            </div>

            <Button
              type="button"
              disabled={!canSend}
              onClick={() => setConfirmOpen(true)}
              className="w-full h-11 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold disabled:opacity-50"
            >
              {sendingEmail ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" /> Send to {selected.size}{" "}
                  {selected.size === 1 ? "user" : "users"}
                </>
              )}
            </Button>

            {lastResult && (
              <div className="flex items-start gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2.5 text-sm text-green-800">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{lastResult.message}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ---------- Live Preview ---------- */}
      <div className="lg:sticky lg:top-24 h-fit">
        <Card className="border-gray-200 shadow-sm overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-yellow-600" />
              Live preview
              {greetingName && (
                <Badge className="ml-auto bg-gray-100 text-gray-600 border-0 font-normal">
                  as {greetingName}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[70vh] overflow-y-auto bg-gray-100">
              <EmailPreview
                greetingName={greetingName}
                subject={subject}
                message={message}
                regards={regards}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ---------- Confirm dialog ---------- */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send this email?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send{" "}
              <span className="font-semibold text-gray-900">“{subject}”</span> to{" "}
              <span className="font-semibold text-gray-900">
                {selected.size} {selected.size === 1 ? "user" : "users"}
              </span>
              . Each person receives their own copy — recipients won't see each
              other. This can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={sendingEmail}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSend}
              disabled={sendingEmail}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              {sendingEmail ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending…
                </>
              ) : (
                "Send now"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
