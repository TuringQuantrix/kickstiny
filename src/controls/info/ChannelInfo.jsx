import React from "react";
import { Users, Clock } from "lucide-react";
import NumberFlow from "@number-flow/react";

export default function ChannelInfo({ username, viewerCount, uptime }) {
  const parts = [];

  if (username) {
    parts.push(
      <span className="channel-info__username">
        <span className="channel-info__live-dot" />
        {username}
      </span>,
    );
  }

  if (viewerCount !== null && viewerCount !== undefined) {
    parts.push(
      <span className="channel-info__meta">
        <Users size={12} strokeWidth={3} />
        <NumberFlow value={viewerCount} />
      </span>,
    );
  }

  if (uptime !== null && uptime !== undefined) {
    parts.push(
      <span className="channel-info__meta">
        <Clock size={12} strokeWidth={3} />
        {uptime}
      </span>,
    );
  }

  return (
    <span className="channel-info">
      {parts.map((part, index) => (
        <React.Fragment key={index}>{part}</React.Fragment>
      ))}
    </span>
  );
}
