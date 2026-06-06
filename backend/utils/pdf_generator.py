from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO


def build_pdf_bytes(lecture_doc):
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter
    margin = 40
    y = height - margin

    c.setFont('Helvetica-Bold', 16)
    c.drawString(margin, y, lecture_doc.get('title', 'Lecture Notes'))
    y -= 30

    c.setFont('Helvetica', 10)
    meta = f"Created: {lecture_doc.get('createdAt')}"
    c.drawString(margin, y, meta)
    y -= 20

    # Summary
    summary = lecture_doc.get('summary') or ''
    c.setFont('Helvetica-Bold', 12)
    c.drawString(margin, y, 'Summary')
    y -= 16
    c.setFont('Helvetica', 10)
    for line in split_text(summary, 90):
        c.drawString(margin, y, line)
        y -= 12
        if y < margin:
            c.showPage()
            y = height - margin

    # Keywords
    y -= 10
    c.setFont('Helvetica-Bold', 12)
    c.drawString(margin, y, 'Keywords')
    y -= 16
    c.setFont('Helvetica', 10)
    keywords = ', '.join(lecture_doc.get('keywords') or [])
    for line in split_text(keywords, 90):
        c.drawString(margin, y, line)
        y -= 12
        if y < margin:
            c.showPage()
            y = height - margin

    # Transcript
    y -= 10
    c.setFont('Helvetica-Bold', 12)
    c.drawString(margin, y, 'Transcript')
    y -= 16
    c.setFont('Helvetica', 9)
    transcript = lecture_doc.get('transcript') or ''
    for line in split_text(transcript, 100):
        c.drawString(margin, y, line)
        y -= 10
        if y < margin:
            c.showPage()
            y = height - margin

    c.save()
    buffer.seek(0)
    return buffer.read()


def split_text(text, width):
    words = text.split()
    lines = []
    cur = []
    cur_len = 0
    for w in words:
        if cur_len + len(w) + 1 > width:
            lines.append(' '.join(cur))
            cur = [w]
            cur_len = len(w)
        else:
            cur.append(w)
            cur_len += len(w) + 1
    if cur:
        lines.append(' '.join(cur))
    return lines
