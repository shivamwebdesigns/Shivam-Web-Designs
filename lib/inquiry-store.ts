import { FieldValue, getFirebaseAdminDb } from '@/lib/firebase/admin';

export type InquiryEmailStatus = 'pending' | 'sent' | 'not_configured' | 'failed';

export type NewInquiry =
  | {
      kind: 'project';
      name: string;
      email: string;
      company: string;
      projectType: string;
      budget: string;
      timeline: string;
      description: string;
      referenceUrl: string;
      additionalRequirements: string;
    }
  | {
      kind: 'contact';
      name: string;
      email: string;
      subject: string;
      message: string;
    };

export async function saveInquiry(inquiry: NewInquiry) {
  const document = await getFirebaseAdminDb().collection('inquiries').add({
    ...inquiry,
    emailStatus: 'pending' satisfies InquiryEmailStatus,
    createdAt: FieldValue.serverTimestamp(),
  });

  return document.id;
}

export async function updateInquiryEmailStatus(
  inquiryId: string,
  status: InquiryEmailStatus
) {
  await getFirebaseAdminDb().collection('inquiries').doc(inquiryId).update({
    emailStatus: status,
  });
}
