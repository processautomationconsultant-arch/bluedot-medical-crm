import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Standard fonts
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
    paddingBottom: 10,
    marginBottom: 20,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    backgroundColor: '#f1f5f9',
    padding: 5,
    marginBottom: 10,
    color: '#1e293b',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 120,
    fontWeight: 'bold',
    color: '#64748b',
  },
  value: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 8,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
  }
});

interface FlightBriefProps {
  data: any;
}

export const FlightBriefPDF = ({ data }: FlightBriefProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>BLUEDOT MEDICAL</Text>
        <View>
          <Text style={styles.title}>FLIGHT BRIEF</Text>
          <Text>{data.case_id} | {new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      {/* Patient Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PATIENT INFORMATION</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Patient Name:</Text>
          <Text style={styles.value}>{data.patient_name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Age / Gender:</Text>
          <Text style={styles.value}>{data.patient_age} / {data.patient_gender}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Diagnosis:</Text>
          <Text style={styles.value}>{data.patient_diagnosis || 'Restricted / See Case File'}</Text>
        </View>
      </View>

      {/* Transfer Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TRANSFER LOGISTICS</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Planned Date:</Text>
          <Text style={styles.value}>{data.planned_transfer_date ? new Date(data.planned_transfer_date).toLocaleDateString() : 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Origin:</Text>
          <Text style={styles.value}>{data.origin_city}, {data.origin_country}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Destination:</Text>
          <Text style={styles.value}>{data.destination_city}, {data.destination_country}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Airlines / Flight:</Text>
          <Text style={styles.value}>{data.airlines || 'TBA'} / {data.flight_number || 'TBA'}</Text>
        </View>
      </View>

      {/* Medical Crew */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ASSIGNED CREW</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Medical Doctor:</Text>
          <Text style={styles.value}>{data.doctor?.name || 'Unassigned'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Flight Nurse:</Text>
          <Text style={styles.value}>{data.nurse?.name || 'Unassigned'}</Text>
        </View>
      </View>

      {/* Logistics & Facilities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FACILITY INFORMATION</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Sending Facility:</Text>
          <Text style={styles.value}>{data.sending_facility?.facility_name || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Receiving Facility:</Text>
          <Text style={styles.value}>{data.receiving_facility?.facility_name || 'N/A'}</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        CONFIDENTIAL MEDICAL DOCUMENT - BLUEDOT ASSISTANCE - DUBAI, UAE
      </Text>
    </Page>
  </Document>
);
