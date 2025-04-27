import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import OpenSansRegular from '../../public/fonts/open-sans.regular.ttf';
import OpenSansBold from '../../public/fonts/open-sans.bold.ttf';

// Registracija fonta
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
        textAlign: 'center',
        fontWeight: 'normal', // Reset na normal
        fontFamily: 'Open Sans',
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
        marginTop: 5,
        fontSize: 10,
        color: 'gray',
        textAlign: 'center',
    },
    bulletItem: {
        flexDirection: 'row',
        marginBottom: 4,
        justifyContent: 'center',
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
}

const ContractPDF: React.FC<ContractPDFProps> = ({ contractText }) => {
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
        let signatures: string[] = [];

        paragraphs.forEach((para, idx) => {
            const trimmed = para.trim();

            if (trimmed.startsWith('Za prvu ugovornu stranu') || trimmed.startsWith('Za drugu ugovornu stranu')) {
                signatures.push(trimmed);
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
                        <Text style={styles.paragraph}>{trimmed.substring(1).trim()}</Text>
                    </View>
                );
            } else if (trimmed.length > 0) {
                content.push(
                    <Text key={idx} style={styles.paragraph}>
                        {trimmed}
                    </Text>
                );
            }
        });


        return { content, signatures };
    };

    const { content, signatures } = formatParagraphs(contractText);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {content}

                {/* Sekcija potpisa */}
                {signatures.length >= 2 && (
                    <View style={styles.signatureSection}>
                        <View style={styles.signatureBlock}>
                            <Text>{signatures[0]}</Text>
                            <View style={styles.signatureLine} />
                            <Text style={styles.sealPlaceholder}>M.P.</Text>
                        </View>
                        <View style={styles.signatureBlock}>
                            <Text>{signatures[1]}</Text>
                            <View style={styles.signatureLine} />
                            <Text style={styles.sealPlaceholder}>M.P.</Text>
                        </View>
                    </View>
                )}
            </Page>
        </Document>
    );
};

export default ContractPDF;
