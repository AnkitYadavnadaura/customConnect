import React from "react";
import { Card, CardContent } from "@/components/card";
import { Button } from "@/components/button";
import { Avatar } from "@/components/avatar";
import { Input } from "@/components/input";
import { Video, Image, MessageSquare } from "lucide-react";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Post Input Box */}
      <Card className="p-4 mb-4">
        <div className="flex gap-3 items-center">
          <Avatar className="w-12 h-12 bg-gray-300" />
          <Input placeholder="What's on your mind?" className="flex-1" />
        </div>
        <div className="flex justify-between mt-3">
          <Button variant="ghost" className="flex items-center gap-2">
            <Image size={20} /> Photo
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Video size={20} /> Video
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <MessageSquare size={20} /> Write
          </Button>
        </div>
      </Card>

      {/* Posts Feed */}
      <Card className="p-4">
        <div className="flex gap-3 items-center">
          <Avatar className="w-12 h-12 bg-gray-300" />
          <div>
            <h4 className="font-bold">John Doe</h4>
            <p className="text-sm text-gray-500">2h ago</p>
          </div>
        </div>
        <CardContent className="mt-3">
          <p>Just launched my new project! 🚀</p>
          <img
            src="https://via.placeholder.com/400"
            alt="Post"
            className="mt-3 rounded-lg w-full"
          />
        </CardContent>
        <div className="flex justify-between mt-3">
          <Button variant="ghost">👍 Like</Button>
          <Button variant="ghost">💬 Comment</Button>
          <Button variant="ghost">🔄 Share</Button>
        </div>
      </Card>
    </div>
  );
};

export default Home;
