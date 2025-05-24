'use client';

import React from 'react';
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaLink,
  FaEye,
  FaPlus,
  FaChartBar,
  FaCalendarAlt,
} from 'react-icons/fa';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Sidebar = () => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-primary transition-all duration-300 hover:scale-105">
              <img
                src="https://avatars.githubusercontent.com/u/1234567"
                alt="GitHub Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 rounded-full bg-secondary p-2 text-green-400 shadow-lg shadow-primary/50">
              <FaCheckCircle className="text-white" />
            </div>
          </div>

          <h1 className="mt-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            @johndoe
          </h1>
          <h2 className="mt-1 text-xl font-medium">John Doe</h2>

          <div className="mt-3 space-y-1 text-center">
            <p className="italic text-muted-foreground">
              Full-stack developer passionate about web technologies
            </p>
            <p className="mt-2 flex items-center justify-center gap-1 text-muted-foreground">
              <FaMapMarkerAlt className="text-sm" />
              San Francisco, CA
            </p>
            <p className="flex items-center justify-center gap-1 text-muted-foreground">
              <FaLink className="text-sm" />
              <a
                href="#"
                className="text-primary transition-colors duration-200 hover:text-primary/80"
              >
                johndoe.dev
              </a>
            </p>
          </div>

          <div className="mt-6 grid w-full grid-cols-2 gap-4">
            <Button>
              <FaEye />
              View Profile
            </Button>
            <Button>
              <FaPlus />
              Follow
            </Button>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <FaChartBar className="text-primary" />
            Stats Overview
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Repositories', value: 128 },
              { label: 'Gists', value: 45 },
              { label: 'Followers', value: 543 },
              { label: 'Following', value: 167 },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-lg bg-accent p-3 transition-colors duration-200 hover:bg-accent/80"
              >
                <div className="text-2xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <FaCalendarAlt className="text-primary" />
            Account Info
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Member since</span>
              <span>March 15, 2018</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last active</span>
              <span>Today</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">User ID</span>
              <span className="font-mono text-sm">14285763</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account type</span>
              <Badge>Pro</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
