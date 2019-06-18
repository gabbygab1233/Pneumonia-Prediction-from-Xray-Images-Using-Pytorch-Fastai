# Pneumonia Detection Using X-ray Images

![jZqpV51](https://user-images.githubusercontent.com/37177883/56046385-b02ff300-5d75-11e9-9439-dc964bf3fb22.png)

Figure S6. Illustrative Examples of Chest X-Rays in Patients with Pneumonia, Related to Figure 6 The normal chest X-ray (left panel) depicts clear lungs without any areas of abnormal opacification in the image. Bacterial pneumonia (middle) typically exhibits a focal lobar consolidation, in this case in the right upper lobe (white arrows), whereas viral pneumonia (right) manifests with a more diffuse ‘‘interstitial’’ pattern in both lungs. http://www.cell.com/cell/fulltext/S0092-8674(18)30154-5

# Content

The dataset is organized into 3 folders (train, test, val) and contains subfolders for each image category (Pneumonia/Normal). There are 5,863 X-Ray images (JPEG) and 2 categories (Pneumonia/Normal).

Chest X-ray images (anterior-posterior) were selected from retrospective cohorts of pediatric patients of one to five years old from Guangzhou Women and Children’s Medical Center, Guangzhou. All chest X-ray imaging was performed as part of patients’ routine clinical care.

For the analysis of chest x-ray images, all chest radiographs were initially screened for quality control by removing all low quality or unreadable scans. The diagnoses for the images were then graded by two expert physicians before being cleared for training the AI system. In order to account for any grading errors, the evaluation set was also checked by a third expert.

# Demo

The web app is available at https://neurocyton-pneumonia-detection.herokuapp.com.


![jZqpV51](https://i.imgur.com/sAJyuCr.png)

# Dependencies

* Python 3.6.6
* Fastai 1.0.52 
* Flask 
