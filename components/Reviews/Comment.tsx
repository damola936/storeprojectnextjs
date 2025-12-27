"use client"
import {useState} from "react";
import {Button} from "../ui/button";

function Comment({comment}: { comment: string }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const longComment = comment.length > 130
    const displayText = (longComment && !isExpanded)
        ? `${comment.substring(0, 130)}...`
        : comment;
    return (
        <div>
            <p className="text-sm">{displayText}</p>
            {longComment && <Button variant="link"
                        className="pl-0 text-muted-foreground"
                        onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? "Read Less" : "Read More"}</Button>}
        </div>
    );
}

export default Comment;