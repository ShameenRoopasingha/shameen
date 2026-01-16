import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, company, message, rating } = body;

        if (!name || !message) {
            return NextResponse.json(
                { error: 'Name and message are required' },
                { status: 400 }
            );
        }

        const feedback = await prisma.feedback.create({
            data: {
                name,
                company: company || null,
                message,
                rating: rating || 5,
                isApproved: false, // Requires manual approval
            },
        });

        return NextResponse.json({ success: true, feedback }, { status: 201 });
    } catch (error) {
        console.error('Error creating feedback:', error);
        return NextResponse.json(
            { error: 'Failed to submit feedback' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const feedbacks = await prisma.feedback.findMany({
            where: { isApproved: true },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ feedbacks });
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        return NextResponse.json(
            { error: 'Failed to fetch feedbacks' },
            { status: 500 }
        );
    }
}
