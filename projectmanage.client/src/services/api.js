// 真實 API 服務
class ApiService {
    static baseUrl = 'https://localhost:7000/api';

    static async getProjects() {
        try {
            const response = await fetch(`${this.baseUrl}/Projects`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('載入專案失敗:', error);
            return [];
        }
    }

    static async addTask(projectId, task) {
        try {
            const response = await fetch(`${this.baseUrl}/Projects/${projectId}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: task.title,
                    assignee: task.assignee,
                    priority: task.priority
                })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('新增任務失敗:', error);
            throw error;
        }
    }

    static async uploadDocument(projectId, file) {
        try {
            const response = await fetch(`${this.baseUrl}/Projects/${projectId}/documents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: file.name,
                    uploadedBy: "目前使用者"
                })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('上傳文件失敗:', error);
            throw error;
        }
    }

    // 新增專案
    static async createProject(project) {
        try {
            const response = await fetch(`${this.baseUrl}/Projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: project.name,
                    budget: project.budget,
                    spent: project.spent || 0,
                    progress: project.progress || 0,
                    status: project.status || "進行中"
                })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('新增專案失敗:', error);
            throw error;
        }
    }

    // 更新任務狀態
    static async updateTaskStatus(taskId, status) {
        try {
            const response = await fetch(`${this.baseUrl}/Tasks/${taskId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(status)
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return true;
        } catch (error) {
            console.error('更新任務狀態失敗:', error);
            throw error;
        }
    }

    // 刪除任務
    static async deleteTask(taskId) {
        try {
            const response = await fetch(`${this.baseUrl}/Tasks/${taskId}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return true;
        } catch (error) {
            console.error('刪除任務失敗:', error);
            throw error;
        }
    }
}

export default ApiService;