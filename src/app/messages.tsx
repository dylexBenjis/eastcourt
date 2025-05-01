"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Home, MoreHorizontal, PaperclipIcon, Search, Send } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { Separator } from "@/src/components/ui/separator"

export function Messages() {
  const [activeConversation, setActiveConversation] = useState(0)
  const [message, setMessage] = useState("")

  // Sample conversations data
  const conversations = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Agent",
      },
      property: {
        title: "Modern Apartment with City View",
        image: "/placeholder.svg?height=60&width=60",
      },
      lastMessage: "I'd like to schedule a viewing for this weekend if possible.",
      time: "10:32 AM",
      unread: true,
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Agent",
      },
      property: {
        title: "Spacious Family Home",
        image: "/placeholder.svg?height=60&width=60",
      },
      lastMessage: "Thank you for your interest. The property is still available.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      user: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Buyer",
      },
      property: {
        title: "Luxury Penthouse",
        image: "/placeholder.svg?height=60&width=60",
      },
      lastMessage: "Is the price negotiable? I'm very interested in making an offer.",
      time: "2 days ago",
      unread: false,
    },
  ]

  // Sample messages for the active conversation
  const messages = [
    {
      id: 1,
      sender: "user",
      text: "Hello, I'm interested in the Modern Apartment with City View. Is it still available?",
      time: "10:15 AM",
    },
    {
      id: 2,
      sender: "other",
      text: "Hi there! Yes, the apartment is still available. Would you like to schedule a viewing?",
      time: "10:18 AM",
    },
    {
      id: 3,
      sender: "user",
      text: "That would be great. I'm available this weekend, either Saturday or Sunday afternoon.",
      time: "10:25 AM",
    },
    {
      id: 4,
      sender: "other",
      text: "Perfect! I can arrange a viewing for Saturday at 2 PM. Does that work for you?",
      time: "10:30 AM",
    },
    {
      id: 5,
      sender: "user",
      text: "I'd like to schedule a viewing for this weekend if possible.",
      time: "10:32 AM",
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would send the message to the server
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  return (
    <div className="container max-w-[1200px] grid h-[calc(100vh-12rem)] grid-cols-1 gap-6 px-4 py-6 md:grid-cols-3 md:px-6 md:py-8">
      {/* Conversations List */}
      <Card className="md:col-span-1">
        <CardHeader className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-8" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-16rem)]">
            {conversations.map((conversation, index) => (
              <div key={conversation.id}>
                <button
                  className={`flex w-full items-start gap-3 p-4 text-left hover:bg-muted/50 ${
                    activeConversation === index ? "bg-muted" : ""
                  }`}
                  onClick={() => setActiveConversation(index)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.user.avatar || "/placeholder.svg"} alt={conversation.user.name} />
                    <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{conversation.user.name}</p>
                      <span className="text-xs text-muted-foreground">{conversation.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">{conversation.user.role}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="line-clamp-1 text-xs text-muted-foreground">{conversation.property.title}</span>
                    </div>
                    <p className="line-clamp-1 text-sm">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                </button>
                <Separator />
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Active Conversation */}
      <Card className="flex flex-col md:col-span-2">
        <CardHeader className="flex-row items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={conversations[activeConversation]?.user.avatar || "/placeholder.svg"}
                alt={conversations[activeConversation]?.user.name}
              />
              <AvatarFallback>{conversations[activeConversation]?.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{conversations[activeConversation]?.user.name}</p>
              <p className="text-xs text-muted-foreground">{conversations[activeConversation]?.user.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Home className="h-4 w-4" />
              <span className="sr-only">View Property</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="flex-1 p-0">
          <div className="flex items-center gap-2 bg-muted/50 p-3">
            <div className="relative h-12 w-12 overflow-hidden rounded">
              <Image
                src={conversations[activeConversation]?.property.image || "/placeholder.svg"}
                alt={conversations[activeConversation]?.property.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{conversations[activeConversation]?.property.title}</p>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                View Property <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-24rem)]">
            <div className="flex flex-col gap-4 p-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={`mt-1 text-right text-xs ${
                        msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <PaperclipIcon className="h-4 w-4" />
              <span className="sr-only">Attach file</span>
            </Button>
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
              className="flex-1"
            />
            <Button size="icon" className="h-8 w-8" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
