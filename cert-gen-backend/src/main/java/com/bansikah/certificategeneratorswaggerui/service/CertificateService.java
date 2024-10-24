package com.bansikah.certificategeneratorswaggerui.service;

import com.bansikah.certificategeneratorswaggerui.model.Certificate;
import com.bansikah.certificategeneratorswaggerui.model.CertificateRequest;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CertificateService {

    private final Map<Long, Certificate> certificateStore = new HashMap<>();
    private long idCounter = 1;

    public Certificate generateCertificate(CertificateRequest request) {
        Certificate certificate = new Certificate();
        certificate.setId(idCounter++);
        certificate.setName(request.getName());
        certificate.setCourse(request.getCourse());
        certificate.setManufacturedDate(request.getManufacturedDate());
        certificate.setExpiryDate(request.getExpiryDate());
        certificate.setIssuer("Bansico");

        certificateStore.put(certificate.getId(), certificate);
        return certificate;
    }

    public byte[] generatePdf(Certificate certificate) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.BLACK);
            Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.BLACK);

            Paragraph title = new Paragraph("Certificate of Completion", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(Chunk.NEWLINE);

            document.add(new Paragraph("This is to certify that", normalFont));
            document.add(new Paragraph(certificate.getName(), titleFont));
            document.add(new Paragraph("has successfully completed the course", normalFont));
            document.add(new Paragraph(certificate.getCourse(), titleFont));
            document.add(Chunk.NEWLINE);

            document.add(new Paragraph("Manufactured Date: " + certificate.getManufacturedDate(), normalFont));
            document.add(new Paragraph("Expiry Date: " + certificate.getExpiryDate(), normalFont));
            document.add(Chunk.NEWLINE);

            document.add(new Paragraph("Issued by: " + certificate.getIssuer(), normalFont));

            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return out.toByteArray();
    }

    public List<Certificate> getAllCertificates() {
        return new ArrayList<>(certificateStore.values());
    }

    public Certificate getCertificate(Long id) {
        return certificateStore.get(id);
    }

    public Certificate updateCertificate(Long id, CertificateRequest request) {
        Certificate certificate = certificateStore.get(id);
        if (certificate != null) {
            certificate.setName(request.getName());
            certificate.setCourse(request.getCourse());
            certificate.setManufacturedDate(request.getManufacturedDate());
            certificate.setExpiryDate(request.getExpiryDate());
            certificateStore.put(id, certificate);
        }
        return certificate;
    }

    public void deleteCertificate(Long id) {
        certificateStore.remove(id);
    }
}