import { DraftPayload } from "../../types/draftPayload";
import { calculateDealData } from "../../build/calculateDealData";
import { buildDerivedData } from "../../build/buildDerivedData";

export function buildDraftPayloadFromForm(formData: any): DraftPayload {
    const pdfData = {
        scheme_number: formData.property.scheme_number,
        property_identifier: formData.property.property_identifier,
        property_address: formData.property.property_address,
        property_area: formData.property.property_area,
        building_identifier: formData.property.building_identifier,
        parcel_identifier: formData.property.parcel_identifier,
        property_purpose: formData.property.property_purpose,
        building_purpose: formData.property.building_purpose,
        building_floors: formData.property.building_floors,
        property_levels: formData.property.property_levels,
        attached_parts: formData.property.attached_parts,
        neighbors: formData.property.neighbors,
    };

    const manualData = {
        seller: formData.parties.seller,
        buyer: formData.parties.buyer,
        deal: formData.deal,
        notary: formData.notary,
        tax_evaluation: formData.tax,
        seller_bank: formData.seller_bank,
        ownership_proof_text: formData.documents?.ownership_proof_text || "",
        presented_documents_text: formData.documents?.presented_documents_text || "",
    };

    const calculatedData = calculateDealData(manualData);
    const derivedData = buildDerivedData(pdfData, manualData, calculatedData);

    return {
        pdf_data: pdfData,
        manual_data: manualData,
        calculated_data: calculatedData,
        derived_data: derivedData,
    };
}