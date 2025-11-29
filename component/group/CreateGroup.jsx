import React, { useState } from "react";
import { Loader2, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useGroupStore } from "@/store/useGroupStore";
import toast from "react-hot-toast";

const CreateGroupDialog = () => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [joinType, setJoinType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { isCreating, createGroup } = useGroupStore();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (!groupName || groupName.length < 3) {
        toast.error("Group name must be 3 character long");
      }
      if (!joinType) {
        toast.error("Choose join type");
      }
      await createGroup({
        name: groupName,
        description: description,
        joinType: joinType,
      });
      toast.success("Group created successfully");

      setGroupName("");
      setDescription("");
      setJoinType("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating group" || error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="primary"
          className="bg-yellow-500 hover:bg-yellow-600 text-[17px] px-4 py-2 w-auto"
        >
          <Users className="h-6 w-6 mr-1" />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6">
        <DialogHeader className="space-y-0.5 border-b border-zinc-200 pb-3 mb-4">
          <DialogTitle className="font-bold text-lg text-zinc-900">
            Create New <span className="text-yellow-500">Group</span>
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-500">
            Set up your group's identity and join settings.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreate} className="space-y-4">
          <Label htmlFor="group-name">Group Name</Label>
          <Input
            id="group-name"
            placeholder="e.g., React Devs Central"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Tell members what your group is about (max 500 chars)."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-700">
              Join Type
            </label>
            <Select onValueChange={setJoinType} value={joinType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose join type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Join type</SelectLabel>
                  <SelectItem value="ANYONE_CAN_JOIN">
                    Anyone can join
                  </SelectItem>
                  <SelectItem value="INVITE_ONLY">Invite only</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 mt-4"
          >
            {isCreating ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Creating group</span>{" "}
              </>
            ) : (
              "Create Group"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
