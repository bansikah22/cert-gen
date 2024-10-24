package com.bansikah.certificategeneratorswaggerui.controller;

import com.bansikah.certificategeneratorswaggerui.model.Certificate;
import com.bansikah.certificategeneratorswaggerui.model.CertificateRequest;
import com.bansikah.certificategeneratorswaggerui.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = {"http://localhost:3001", "http://frontend.localhost", "http://frontend.local"})
public class CertificateController {

    private final CertificateService certificateService;

    @Autowired
    public CertificateController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generateCertificate(@RequestBody CertificateRequest request, @RequestHeader("Accept") String acceptHeader) {
        Certificate certificate = certificateService.generateCertificate(request);

        if (acceptHeader.contains("application/json")) {
            // Return metadata for Swagger UI
            return ResponseEntity.ok(certificate);
        } else {
            // Return PDF file for actual use
            byte[] pdfBytes = certificateService.generatePdf(certificate);
            ByteArrayResource resource = new ByteArrayResource(pdfBytes);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=certificate.pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .contentLength(pdfBytes.length)
                    .body(resource);
        }
    }

    @GetMapping
    public ResponseEntity<List<Certificate>> getAllCertificates() {
        List<Certificate> certificates = certificateService.getAllCertificates();
        return ResponseEntity.ok(certificates);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCertificate(@PathVariable Long id, @RequestHeader("Accept") String acceptHeader) {
        Certificate certificate = certificateService.getCertificate(id);

        if (acceptHeader.contains("application/json")) {
            // Return JSON data for API calls
            return ResponseEntity.ok(certificate);
        } else {
            // Return PDF file for download
            byte[] pdfBytes = certificateService.generatePdf(certificate);
            ByteArrayResource resource = new ByteArrayResource(pdfBytes);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=certificate-" + id + ".pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .contentLength(pdfBytes.length)
                    .body(resource);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Certificate> updateCertificate(@PathVariable Long id, @RequestBody CertificateRequest request) {
        Certificate updatedCertificate = certificateService.updateCertificate(id, request);
        return ResponseEntity.ok(updatedCertificate);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCertificate(@PathVariable Long id) {
        certificateService.deleteCertificate(id);
        return ResponseEntity.noContent().build();
    }
}