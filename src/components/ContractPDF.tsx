import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import OpenSansRegular from '../../public/fonts/open-sans.regular.ttf';
import OpenSansBold from '../../public/fonts/open-sans.bold.ttf';

Font.register({
    family: 'Open Sans',
    fonts: [
        { src: OpenSansRegular, fontWeight: 'normal' },
        { src: OpenSansBold, fontWeight: 'bold' },
    ],
});

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Open Sans',
        fontSize: 12,
        lineHeight: 1.5,
    },
    centeredTitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textTransform: 'uppercase',
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    paragraph: {
        marginBottom: 8,
        textAlign: 'justify',
    },
    clanTitle: {
        marginTop: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    signatureSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 60,
    },
    signatureBlock: {
        width: '45%',
        alignItems: 'center',
    },
    signatureLine: {
        marginTop: 40,
        borderTop: '1px solid #000',
        width: '80%',
    },
    sealPlaceholder: {
        marginTop: 10,
        fontSize: 10,
        color: 'gray',
    },
    partyInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    partyBlock: {
        width: '45%',
    },
    boldText: {
        fontWeight: 'bold',
    },
    dateBottomRight: {
        textAlign: 'right',
        marginTop: 40,
        fontSize: 11,
    },
    bulletItem: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    bulletPoint: {
        width: 10,
        fontSize: 14,
    },
    bulletText: {
        flex: 1,
        fontSize: 12,
    },
});

interface ContractPDFProps {
    contractText: string;
    adminInfo: {
        name: string;
        idNumber: string;
        entityType: 'pravno_lice' | 'fizicko_lice';
    };
    clientInfo: {
        name: string;
        idNumber: string;
        entityType: 'pravno_lice' | 'fizicko_lice';
    };
}

const ContractPDF: React.FC<ContractPDFProps> = ({ contractText, adminInfo, clientInfo }) => {
    const cleanText = (text: string) => {
        let cleaned = text;
        if (cleaned.startsWith('Priprema:')) {
            cleaned = cleaned.substring(cleaned.indexOf('\n') + 1);
        }
        return cleaned.trim();
    };

    const formatParagraphs = (text: string) => {
        const paragraphs = cleanText(text).split(/\n{2,}/g);

        let content: any[] = [];
        paragraphs.forEach((para, idx) => {
            const trimmed = para.trim();

            if (trimmed.startsWith('Za prvu ugovornu stranu') || trimmed.startsWith('Za drugu ugovornu stranu')) {
                // preskoči
            } else if (/^UGOVOR O .+/i.test(trimmed)) {
                content.push(<Text key={idx} style={styles.centeredTitle}>{trimmed}</Text>);
            } else if (/^[A-ZČĆŽŠĐ\s]+$/i.test(trimmed) && trimmed.length > 5) {
                content.push(<Text key={idx} style={styles.sectionTitle}>{trimmed}</Text>);
            } else if (/^Član\s*\d+/i.test(trimmed)) {
                content.push(<Text key={idx} style={styles.clanTitle}>{trimmed}</Text>);
            } else if (trimmed.startsWith('*')) {
                content.push(
                    <View key={idx} style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>{trimmed.substring(1).trim()}</Text>
                    </View>
                );
            } else {
                content.push(<Text key={idx} style={styles.paragraph}>{trimmed}</Text>);
            }
        });

        return content;
    };

    const adminIdLabel = adminInfo.entityType === 'pravno_lice' ? 'OIB' : 'JMBG';
    const clientIdLabel = clientInfo.entityType === 'pravno_lice' ? 'OIB' : 'JMBG';

    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}.`;

    const paragraphs = formatParagraphs(contractText);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Uvodne strane */}
                <View style={styles.partyInfo}>
                    <View style={styles.partyBlock}>
                        <Text style={styles.boldText}>{adminInfo.name}</Text>
                        <Text style={styles.boldText}>{adminIdLabel}: {adminInfo.idNumber}</Text>
                    </View>
                    <View style={styles.partyBlock}>
                        <Text style={styles.boldText}>{clientInfo.name}</Text>
                        <Text style={styles.boldText}>{clientIdLabel}: {clientInfo.idNumber}</Text>
                    </View>
                </View>

                {paragraphs}

                {/* Datum dolje desno */}
                <Text style={styles.dateBottomRight}>
                    Datum: {formattedDate}
                </Text>

                {/* Sekcija potpisa */}
                <View style={styles.signatureSection}>
                    <View style={styles.signatureBlock}>
                        <Text>Za prvu ugovornu stranu:</Text>
                        <View style={styles.signatureLine} />
                        <Text style={styles.sealPlaceholder}>Pečat i potpis</Text>
                    </View>
                    <View style={styles.signatureBlock}>
                        <Text>Za drugu ugovornu stranu:</Text>
                        <View style={styles.signatureLine} />
                        <Text style={styles.sealPlaceholder}>Pečat i potpis</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default ContractPDF;
