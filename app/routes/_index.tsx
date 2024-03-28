import globalStyles from '~/styles/global.css'

import type { MetaFunction } from "@remix-run/node";
import { useLoaderData, Link } from '@remix-run/react';

import  prisma from '~/lib/db.server'

export const meta: MetaFunction = () => {
  return [
    { title: "Prisma App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const data = {
    teams: await prisma.team.findMany(),
  }
  return data
}

export default function Index() {
  const { teams } = useLoaderData()

  return (
    <>
      <div>
        <h1>Soccer Teams around the world</h1>
      </div>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <h1>{team.team}</h1>
            <p>{team.country}</p>
          </li>
        ))}
      </ul>
    </>
  )
}