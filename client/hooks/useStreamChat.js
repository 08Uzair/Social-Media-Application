// hooks/useStreamChat.js
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";

const apiKey = "5puxp2h2tmt7"; // Replace with your actual Stream API key
const client = StreamChat.getInstance(apiKey);

export default function useStreamChat({ blogPostId, userId, userName, role = "user" }) {
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    if (!blogPostId || !userId || !userName) return;

    const initChat = async () => {
      try {
        setLoading(true);

        // Get token from API route
        const res = await fetch(`/api/stream-token?userId=${userId}`);
        const { token } = await res.json();

        // Connect user to Stream
        await client.connectUser(
          {
            id: userId,
            name: userName,
            image: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}`,
            role, // Include user role (admin/user)
          },
          token
        );

        // Create or watch the blog-specific channel
        const blogChannel = client.channel("messaging", `blog-${blogPostId}`, {
          name: `Comments for Blog ${blogPostId}`,
          members: [userId],
        });

        await blogChannel.watch();
        setChannel(blogChannel);

        // Count number of messages (initial load only)
        const result = await blogChannel.query({ messages: { limit: 100 } });
        setCommentCount(result.messages.length);

      } catch (error) {
        console.error("Stream chat initialization failed:", error);
      } finally {
        setLoading(false);
      }
    };

    initChat();

    return () => {
      if (client.userID) {
        client.disconnectUser().catch((err) =>
          console.warn("Stream cleanup failed", err)
        );
      }
    };
  }, [blogPostId, userId, userName, role]);

  return { channel, loading, commentCount };
}
