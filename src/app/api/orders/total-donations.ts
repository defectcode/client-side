import { NextResponse } from 'next/server';

export async function GET() {
  const totalDonations = 10; // Trebuie să iei această valoare din baza de date
  return NextResponse.json({ totalDonations });
}
