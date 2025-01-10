import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import path from 'path';
import { z } from 'zod';

// Load model parameters at initialization
const modelFilePath = path.join(process.cwd(), 'LinearRegressionModel/model_parameters.json');

const modelParameters = JSON.parse(fs.readFileSync(modelFilePath, 'utf8'));

const weights: number[] = modelParameters.weights;
const bias: number = modelParameters.bias;
const meanValues: number[] = modelParameters.mean_values;
const stdValues: number[] = modelParameters.std_values;

// Zod schema for validation
const predictionSchema = z.object({
  squareFt: z.number(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  age: z.number(),
});

// Feature scaling function
const scaleFeatures = (features: number[]): number[] => {
  return features.map((value, index) => (value - meanValues[index]) / stdValues[index]);
};

// Handle OPTIONS request for CORS
function handleOptions(): NextResponse {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', allowedOrigin);
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return new NextResponse(null, { status: 204, headers });
}

// Handle POST request for prediction
async function handlePost(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    // Validate input
    const data = predictionSchema.parse(body);

    const features = [data.squareFt, data.bedrooms, data.bathrooms, data.age];
    const scaledFeatures = scaleFeatures(features);

    const predictedPrice =
      weights.reduce((sum, weight, index) => sum + weight * scaledFeatures[index], 0) + bias;

    return NextResponse.json({ predictedPrice });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// Route handler
export async function OPTIONS(): Promise<NextResponse> {
  return handleOptions();
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return handlePost(req);
}
