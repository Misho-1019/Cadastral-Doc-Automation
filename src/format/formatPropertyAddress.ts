import { formatOrdinalBg } from "./formatOrdinalBg";
import { numberToWordsBg } from "./numberToWordsBg";

function titleCaseBulgarianStreetName(text: string): string {
    return text.toLowerCase().split(' ').map(word => {
        if (word === 'ii') {
            return 'II';
        }

        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}

export function formatPropertyAddress(address: string): string {
    return address
        .replace(/ул\. ([^№]+) №\s*(\d+)/, (_, streetName, streetNumber) => {
            const formattedStreet = titleCaseBulgarianStreetName(streetName.trim());

            return `ул. ${formattedStreet} (втори) № ${streetNumber} (${numberToWordsBg(Number(streetNumber))})`;
        })
        .replace(/ет\. (\d+)/, (_, floor) => {
            return `етаж ${floor} (${formatOrdinalBg(Number(floor))})`;
        })
        .replace(/ап\. (\d+)/, (_, apartment) => {
            return `апартамент ${apartment} (${formatOrdinalBg(Number(apartment))})`;
        });
}