"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Trash2, Milestone as MilestoneIcon } from "lucide-react";
import { useFounderStore } from "@/store/useFounderStore";
import { formatDate } from "@/utils/formatDate";

/**
 * Founder milestones timeline. For the owner it supports adding and removing
 * milestones; each change persists the whole array via updateFounderProfile.
 */
export default function MilestonesSection({ milestones = [], isOwnProfile }) {
  const { updateFounderProfile, saving } = useFounderStore();
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ title: "", date: "", description: "" });

  const persist = (next) => updateFounderProfile({ milestones: next });

  const handleAdd = async () => {
    if (!draft.title.trim()) return;
    const next = [...milestones, draft];
    const res = await persist(next);
    if (res?.success) {
      setDraft({ title: "", date: "", description: "" });
      setAdding(false);
    }
  };

  const handleDelete = (index) => {
    const next = milestones.filter((_, i) => i !== index);
    persist(next);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MilestoneIcon className="w-5 h-5 text-amber-500" />
          Milestones
        </CardTitle>
        {isOwnProfile && !adding && (
          <Button
            size="sm"
            onClick={() => setAdding(true)}
            className="bg-amber-500 hover:bg-amber-600 text-white"
          >
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-5">
        {isOwnProfile && adding && (
          <div className="space-y-3 p-4 rounded-xl bg-amber-50/60 border border-amber-100">
            <Input
              placeholder="Title (e.g. Launched Peer Pop)"
              value={draft.title}
              onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
            />
            <Input
              type="date"
              value={draft.date}
              onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
            />
            <Textarea
              rows={2}
              placeholder="Description"
              value={draft.description}
              onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
            />
            <div className="flex gap-2">
              <Button
                onClick={handleAdd}
                disabled={saving || !draft.title.trim()}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Save
              </Button>
              <Button variant="ghost" onClick={() => setAdding(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {milestones.length === 0 ? (
          <p className="text-gray-500 text-center py-10 text-sm">
            No milestones yet.
          </p>
        ) : (
          <div className="relative pl-6 border-l-2 border-amber-200 space-y-6">
            {milestones.map((m, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-500 border-4 border-white" />
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{m.title}</h4>
                    {m.date && (
                      <p className="text-xs text-amber-600 font-medium">
                        {formatDate(m.date)}
                      </p>
                    )}
                    {m.description && (
                      <p className="text-sm text-gray-600 mt-1">{m.description}</p>
                    )}
                  </div>
                  {isOwnProfile && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(i)}
                      className="h-8 w-8 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
