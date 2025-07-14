# ProjectManage - 專案管理系統

一個現代化、美觀的專案管理系統，採用前後端分離架構，支援多人協作與即時資料同步。

## 專案特色

- 薰衣草紫美學設計 - 玻璃效果卡片、漸層背景
- 即時資料同步 - 所有操作立即反映到資料庫
- 響應式設計 - 支援桌面、平板、手機
- RESTful API - 標準化後端介面
- 模組化架構 - 前後端完全分離

## 技術架構

```
前端 (React) ↔ API Service ↔ ASP.NET Core API ↔ Entity Framework ↔ SQL Server
```

### 技術棧

- **前端**: React 18 + Vite + Tailwind CSS
- **後端**: ASP.NET Core 8 Web API
- **資料庫**: SQL Server + Entity Framework Core
- **開發工具**: Visual Studio 2022

## 專案結構

```
ProjectManage/
├── ProjectManage.Server/           # 後端 API
│   ├── Controllers/
│   │   ├── ProjectsController.cs   # 專案 CRUD API
│   │   └── TasksController.cs      # 任務管理 API
│   ├── Models/
│   │   └── Project.cs              # 資料模型定義
│   ├── Data/
│   │   └── ApplicationDbContext.cs # 資料庫上下文
│   └── Program.cs                  # 應用程式進入點
│
├── projectmanage.client/           # 前端 React
│   ├── src/
│   │   ├── components/
│   │   │   └── ProjectManage.jsx   # 主要 UI 組件
│   │   ├── services/
│   │   │   └── api.js              # API 服務層
│   │   └── styles.css              # 薰衣草紫主題樣式
│   └── package.json
│
└── README.md                       # 專案說明文件
```

## 快速開始

### 系統需求

- Visual Studio 2022 (17.8 或更新版本)
- .NET 8.0 SDK
- Node.js (18.x 或更新版本)
- SQL Server LocalDB

### 安裝步驟

1. **開啟 Visual Studio 2022**
   ```
   開啟 ProjectManage.sln 解決方案檔案
   ```

2. **設定啟動專案**
   - 右鍵解決方案 → Configure Startup Projects
   - 選擇 "Multiple startup projects"
   - 設定兩個專案都為 "Start"

3. **建立資料庫**
   ```powershell
   # 在 Package Manager Console 執行
   Add-Migration InitialCreate
   Update-Database
   ```

4. **啟動應用程式**
   ```
   按 F5 或點擊 Visual Studio 的啟動按鈕
   ```

### 存取位址

- **前端應用**: https://localhost:9776
- **後端 API**: https://localhost:7000
- **API 文檔**: https://localhost:7000/swagger

## 核心功能

### 專案管理
- 新增/編輯/刪除專案
- 專案預算追蹤
- 進度條視覺化
- 專案狀態管理

### 任務管理  
- 任務新增與分派
- 優先級設定 (高/中/低)
- 狀態追蹤 (待辦/進行中/已完成)
- 即時狀態更新

### 文件管理
- 文件上傳記錄
- 上傳者與時間追蹤
- 文件分類管理

### 使用者體驗
- 薰衣草紫色調設計
- 玻璃效果卡片
- 載入動畫與狀態提示
- 響應式佈局

## API 端點

### 專案相關
```
GET    /api/Projects           # 取得所有專案
POST   /api/Projects           # 新增專案
GET    /api/Projects/{id}      # 取得單一專案
PUT    /api/Projects/{id}      # 更新專案
DELETE /api/Projects/{id}      # 刪除專案
```

### 任務相關
```
POST   /api/Projects/{id}/tasks    # 新增任務到專案
PUT    /api/Tasks/{id}/status      # 更新任務狀態
DELETE /api/Tasks/{id}             # 刪除任務
```

### 文件相關
```
POST   /api/Projects/{id}/documents # 上傳文件到專案
```

## 資料模型

### Project (專案)
```json
{
  "id": 1,
  "name": "網站重新設計",
  "budget": 150000,
  "spent": 98000,
  "progress": 65,
  "status": "進行中",
  "createdAt": "2025-07-14T00:00:00Z",
  "tasks": [...],
  "documents": [...]
}
```

### ProjectTask (任務)
```json
{
  "id": 1,
  "title": "UI/UX 設計",
  "status": "已完成",
  "assignee": "張小明",
  "priority": "高",
  "projectId": 1
}
```

### Document (文件)
```json
{
  "id": 1,
  "name": "設計規格.pdf",
  "uploadedBy": "張小明",
  "timestamp": "2025-07-14T00:00:00Z",
  "projectId": 1
}
```

## 開發重點

### 前端特色
- **玻璃效果**: 使用 backdrop-filter: blur() 實現
- **漸層動畫**: CSS keyframe 動畫背景
- **狀態管理**: React Hooks 管理複雜狀態
- **API 整合**: Fetch API 與錯誤處理

### 後端特色
- **RESTful 設計**: 標準化 HTTP 動詞與狀態碼
- **Entity Framework**: Code First 方式建立資料庫
- **CORS 支援**: 跨域請求處理
- **Swagger 文檔**: 自動生成 API 文檔

## 未來規劃

### 已完成
- 基礎專案 CRUD
- 任務管理系統
- 美觀 UI 設計
- 前後端整合

### 開發中
- 使用者認證系統
- 即時通知功能
- 圖表分析儀表板

### 計劃中
- 檔案實際上傳存儲
- 專案範本功能
- 行動 App 版本
- Docker 容器化部署
- 多租戶支援

## 開發指南

### 新增 API 端點
1. 在 Controllers/ 中新增 Controller
2. 實作所需的 HTTP 方法
3. 更新 Swagger 註解

### 新增前端功能
1. 在 components/ 中建立新組件
2. 在 api.js 中新增對應 API 呼叫
3. 更新主要組件整合新功能

### 資料庫變更
```powershell
# 修改 Models 後執行
Add-Migration [MigrationName]
Update-Database
```

## 貢獻指南

1. Fork 此專案
2. 建立功能分支 (git checkout -b feature/amazing-feature)
3. 提交變更 (git commit -m 'Add amazing feature')
4. 推送到分支 (git push origin feature/amazing-feature)
5. 開啟 Pull Request

## 授權

此專案採用 MIT 授權條款

## 作者

**Your Name** - GitHub Profile

## 致謝

- React 社群提供的優秀生態系統
- Microsoft 的 .NET 8 及相關工具
- Tailwind CSS 團隊的設計系統理念

---

如有任何問題或建議，歡迎開啟 Issue 或聯繫作者！