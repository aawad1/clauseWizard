import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define custom styles
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
        fontFamily: 'Times-Roman',
        lineHeight: 1.6,
    },
    section: {
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold', // <-- koristi standardno boldiranje
        textDecoration: 'underline',
    },
    articleTitle: {
        fontSize: 13,
        fontWeight: 'bold', // <-- koristi standardno boldiranje
        marginBottom: 5,
        marginTop: 10,
    },
    paragraph: {
        fontSize: 12,
        textAlign: 'justify',
    }
});

interface ContractPDFProps {
    contractText: string;
}

const ContractPDF = ({ contractText }: ContractPDFProps) => {
    // Razbij tekst u sekcije
    const paragraphs = contractText.split('\n').filter(line => line.trim() !== '');

    // Automatski izvuci naslov (prvi paragraf, ako je naslov)
    const titleRegex = /^(\s*\*{0,2})(ugovor.*)$/i;
    let documentTitle = 'Ugovor'; // fallback

    if (paragraphs.length > 0) {
        const match = paragraphs[0].match(titleRegex);
        if (match && match[2]) {
            documentTitle = match[2].trim();
            paragraphs.shift(); // skloni prvi red iz arraya jer je već naslov
        }
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Naslov */}
                <Text style={styles.title}>{documentTitle}</Text>

                {paragraphs.map((para, idx) => {
                    const isArticle = para.startsWith('Članak');
                    return (
                        <View key={idx} style={styles.section}>
                            <Text style={isArticle ? styles.articleTitle : styles.paragraph}>
                                {para}
                            </Text>
                        </View>
                    );
                })}
            </Page>
        </Document>
    );
};

export default ContractPDF;
