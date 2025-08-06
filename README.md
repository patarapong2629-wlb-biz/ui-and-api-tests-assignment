# UI-and-API-Tests-Assignment

สำหรับ Assignment 2 ทางผู้ได้รับแบบทดสอบเลือกทำแบบทดสอบที่ 1 Web UI Automation และแบบทดสอบที่ 2 API Automation โดยทั้ง 2 แบบทดสอบ ผู้ได้รับแบบทดสอบเลือกใช้ Playwright framework ในการดำเนินการทดสอบ มีรายละเอียดดังต่อไปนี้

## Pre-requisite

- [Node.js](https://nodejs.org/en/download)

## Installation

1. Clone GitHub repository นี้ ด้วยการรันคำสั่ง (หากไม่มีบัญชี GitHub สามารถดาวน์โหลดไฟล์ ZIP ได้)

```sh
git clone https://github.com/patarapong2629-wlb-biz/ui-and-api-tests-assignment.git
```

2. เปลี่ยน working directory เข้ามาภายในโฟลเดอร์ `ui-and-api-tests-assignment`

```sh
cd ui-and-api-tests-assignment
```

3. ติดตั้ง Packages เพื่อใช้ในการรันคำสั่งเพื่อดำเนินการทดสอบ

```sh
npm install
```

## Assignment 2-1: Web UI Automation

### โจทย์:

คุณได้รับมอบหมายให้สร้าง Test Automation Script สําหรับเว็บไซต์ demo ของ Sauce Labs (https://www.saucedemo.com/) โดยมีเงื่อนไขดังนี้:

    1. เขียน Test Case เพื่อล็อกอินเข้าสู่ระบบด้วย Username standard_user
    2. เมื่อล็อกอินสําเร็จ ให้เพิ่มสินค้าชื่อ "Sauce Labs Backpack" ลงในรถเข็น
    3. ไปยังหน้าตะกร้าสินค้า (Cart) และตรวจสอบว่าสินค้าที่เพิ่มไปปรากฏในรายการสินค้าอย่างถูกต้อง

### หมายเหตุ:

- ทดสอบใน Chrome Firefox และ Safari browser

### สิ่งที่ต้องส่งมอบ:

- Source code ของ Test Automation Framework และ Test Script<br>
  `สามารถดูได้ที่ไฟล์ add-product-to-cart.spec.ts ซึ่งอยู่ภายใต้โฟลเดอร์ ui-tests`
- คําแนะนําสั้นๆ เกี่ยวกับวิธีการรันสคริปต์<br>
  `รันโดยใช้คำสั่ง`
  ```sh
  npm run ui-tests
  ```
  `หลังรันเสร็จจะมีคำสั่งสำหรับการดู test report แสดงขึ้นมา สามารถรัน command ดังกล่าวเพื่อดู test report ได้`
- รายงานผลการทดสอบ (Test Report)<br>
  `ภาพรวมผลการดำเนินการทดสอบทั้ง 3 browsers`
  ![ภาพรวมผลการดำเนินการทดสอบทั้ง 3 browsers](./test-reports/images/ui-tests/test-report-overview.png)
  `รายละเอียดขั้นตอนการดำเนินการทดสอบ`
  ![รายละเอียดขั้นตอนการดำเนินการทดสอบ](./test-reports/images/ui-tests/test-steps-in-chrome-browser.png)
