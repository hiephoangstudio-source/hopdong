---
ĐƯỢC CẮT TỰ ĐỘNG BỞI 12K SENTINEL
Tiếp nối phần 1 của forms
---

## Step 4: Verify Output

Convert the filled PDF to images and verify text placement:
`python scripts/convert_pdf_to_images.py <output.pdf> <verify_images/>`

If text is mispositioned:
- **Approach A**: Check that you're using PDF coordinates from form_structure.json with `pdf_width`/`pdf_height`
- **Approach B**: Check that image dimensions match and coordinates are accurate pixels
- **Hybrid**: Ensure coordinate conversions are correct for visually-estimated fields
