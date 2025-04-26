import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        lineHeight: 1.6,
        fontFamily: 'Times-Roman',
    },
    section: {
        marginBottom: 10,
    }
});

interface ContractPDFProps {
    contractText: string;
}

const ContractPDF = ({ contractText }: ContractPDFProps) => {
    const paragraphs = contractText.split('\n').filter(line => line.trim() !== '');

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {paragraphs.map((para, idx) => (
                    <View key={idx} style={styles.section}>
                        <Text>{para}</Text>
                    </View>
                ))}
            </Page>
        </Document>
    );
};

export default ContractPDF;
