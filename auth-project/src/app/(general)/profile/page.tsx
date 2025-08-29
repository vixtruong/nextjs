"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadAvatar } from "@/services/userService";
import { toastError } from "@/lib/ToastService";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!file) return;

    try {
      await uploadAvatar(file);

      window.location.reload();
    } catch (error) {
      toastError(error);
    }
  };

  if (loading) {
    return (
      <Card className="max-w-md mx-auto mt-10 p-6">
        <Skeleton className="h-16 w-16 rounded-full mx-auto" />
        <Skeleton className="h-6 w-1/2 mt-4 mx-auto" />
        <Skeleton className="h-4 w-2/3 mt-2 mx-auto" />
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="max-w-md mx-auto mt-10 p-6">
        <Skeleton className="h-16 w-16 rounded-full mx-auto" />
        <Skeleton className="h-6 w-1/2 mt-4 mx-auto" />
        <Skeleton className="h-4 w-2/3 mt-2 mx-auto" />
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <CardHeader className="flex flex-col items-center space-y-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.avatarUrl || ""} alt={user.fullName} />
          <AvatarFallback>{user.fullName?.charAt(0) ?? "?"}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl font-bold">{user.fullName}</CardTitle>
      </CardHeader>

      {isEditAvatar ? (
        <>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <div className="flex gap-2 mt-2">
            <Button onClick={handleSubmit} disabled={!file}>
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setIsEditAvatar(false);
                setFile(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <Button onClick={() => setIsEditAvatar(true)}>Edit avatar</Button>
      )}

      <Separator className="my-4" />

      <CardContent className="space-y-2 text-sm">
        <p>
          <strong>Username:</strong> {user.fullName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Joined:</strong>{" "}
          {new Date(user.createdTime).toLocaleDateString("vi-VN")}
        </p>
      </CardContent>
    </Card>
  );
}
