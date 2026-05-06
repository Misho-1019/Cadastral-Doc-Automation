import { Request, Response } from "express";
import { extractPdfText } from "../../extract/extractPdfText";
import { normalizePdfText } from "../../normalize/normalizePdfText";
import { parseCadastreFields } from "../../parse/parseCadastreFields";

export const parsePdfController = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            })
        }

        const filePath = req.file.path;

        const rawText = await extractPdfText(filePath);
        const normalizedText = normalizePdfText(rawText);
        const parsedData = parseCadastreFields(normalizedText);
    
        return res.json({
            success: true,
            message: "PDF parsed successfully",
            data: {
                property: {
                    scheme_number: parsedData.scheme_number,
                    property_identifier: parsedData.property_identifier,
                    property_address: parsedData.property_address,
                    property_area: parsedData.property_area,
                    building_identifier: parsedData.building_identifier,
                    parcel_identifier: parsedData.parcel_identifier,
                    property_purpose: parsedData.property_purpose,
                    building_purpose: parsedData.building_purpose,
                    building_floors: parsedData.building_floors,
                    property_levels: parsedData.property_levels,
                    attached_parts: parsedData.attached_parts,
                    neighbors: parsedData.neighbors,
                },
                parties: {
                    seller: {},
                    buyer: {},
                },
                deal: {},
                documents: {},
                tax: {},
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to process PDF",
        });
    }
}