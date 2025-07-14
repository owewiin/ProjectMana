import { useState, useEffect } from 'react';
import ApiService from '../services/api.js';

function ProjectManage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTask, setNewTask] = useState({ title: '', assignee: '', priority: '中' });
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newProject, setNewProject] = useState({
        name: '',
        budget: '',
        status: '進行中'
    });

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await ApiService.getProjects();
            setProjects(data);
        } catch (error) {
            console.error('載入專案失敗:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (projectId) => {
        if (!newTask.title || !newTask.assignee) return;

        try {
            await ApiService.addTask(projectId, newTask);
            setNewTask({ title: '', assignee: '', priority: '中' });
            loadProjects(); // 重新載入資料
        } catch (error) {
            console.error('新增任務失敗:', error);
        }
    };

    const handleCreateProject = async () => {
        if (!newProject.name || !newProject.budget) return;

        try {
            await ApiService.createProject({
                name: newProject.name,
                budget: parseFloat(newProject.budget),
                spent: 0,
                progress: 0,
                status: newProject.status
            });
            setNewProject({ name: '', budget: '', status: '進行中' });
            setShowCreateForm(false);
            loadProjects(); // 重新載入專案清單
        } catch (error) {
            console.error('建立專案失敗:', error);
        }
    };

    const handleUploadDocument = async (projectId, file) => {
        if (!file) return;

        try {
            await ApiService.uploadDocument(projectId, file);
            loadProjects(); // 重新載入資料
        } catch (error) {
            console.error('上傳文件失敗:', error);
        }
    };

    const handleUpdateTaskStatus = async (taskId, newStatus) => {
        try {
            await ApiService.updateTaskStatus(taskId, newStatus);
            loadProjects(); // 重新載入資料
        } catch (error) {
            console.error('更新任務狀態失敗:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!confirm('確定要刪除此任務嗎？')) return;

        try {
            await ApiService.deleteTask(taskId);
            loadProjects(); // 重新載入資料
        } catch (error) {
            console.error('刪除任務失敗:', error);
        }
    };

    // 格式化日期
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
    };

    // 格式化金額
    const formatCurrency = (amount) => {
        return `NT$ ${amount.toLocaleString()}`;
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case '已完成': return 'bg-green-100 text-green-800';
            case '進行中': return 'bg-purple-100 text-purple-800';
            case '待辦': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityBadgeClass = (priority) => {
        switch (priority) {
            case '高': return 'bg-red-100 text-red-800';
            case '中': return 'bg-yellow-100 text-yellow-800';
            case '低': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="loading"></div>
                <span className="ml-3 text-lg">載入中...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                    ProjectManage 專案管理系統
                </h1>
                <p className="text-center text-purple-600 mb-8">高效管理您的專案進度</p>

                {/* 新增專案按鈕 */}
                <div className="text-center mb-6">
                    <button
                        className="btn-primary"
                        onClick={() => setShowCreateForm(!showCreateForm)}
                    >
                        {showCreateForm ? '取消新增' : '+ 新增專案'}
                    </button>
                </div>

                {/* 新增專案表單 */}
                {showCreateForm && (
                    <div className="glass-card max-w-md mx-auto mb-6">
                        <h3 className="text-lg font-semibold text-purple-700 mb-4">新增專案</h3>
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="專案名稱"
                                className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={newProject.name}
                                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="預算金額"
                                className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={newProject.budget}
                                onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                            />
                            <select
                                className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={newProject.status}
                                onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                            >
                                <option value="準備中">準備中</option>
                                <option value="進行中">進行中</option>
                                <option value="暫停">暫停</option>
                                <option value="已完成">已完成</option>
                            </select>
                            <button
                                className="btn-primary w-full"
                                onClick={handleCreateProject}
                            >
                                建立專案
                            </button>
                        </div>
                    </div>
                )}

                {/* 專案列表 */}
                {projects.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-purple-600 text-lg">尚無專案，請新增第一個專案！</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {projects.map(project => (
                            <div key={project.id} className="glass-card">
                                <div className="mb-4">
                                    <h2 className="text-2xl font-bold text-purple-800 mb-2">{project.name}</h2>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm text-purple-600">
                                            預算: {formatCurrency(project.budget)}
                                        </span>
                                        <span className="text-sm text-purple-600">
                                            已花費: {formatCurrency(project.spent)}
                                        </span>
                                    </div>

                                    {/* 進度條 */}
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm text-purple-600 mb-1">
                                            <span>專案進度</span>
                                            <span>{project.progress}%</span>
                                        </div>
                                        <div className="w-full bg-purple-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${project.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* 專案狀態 */}
                                    <div className="mb-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(project.status)}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                </div>

                                {/* 任務列表 */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-purple-700 mb-3">任務清單</h3>
                                    {project.tasks && project.tasks.length > 0 ? (
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {project.tasks.map(task => (
                                                <div key={task.id} className="bg-white bg-opacity-50 rounded-lg p-3">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex-1">
                                                            <span className="font-medium text-purple-800">{task.title}</span>
                                                            <div className="text-sm text-purple-600">負責人: {task.assignee}</div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDeleteTask(task.id)}
                                                            className="text-red-500 hover:text-red-700 ml-2"
                                                            title="刪除任務"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                    <div className="flex gap-2 items-center">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadgeClass(task.priority)}`}>
                                                            {task.priority}
                                                        </span>
                                                        <select
                                                            className={`px-2 py-1 rounded-full text-xs font-medium border-0 ${getStatusBadgeClass(task.status)}`}
                                                            value={task.status}
                                                            onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
                                                        >
                                                            <option value="待辦">待辦</option>
                                                            <option value="進行中">進行中</option>
                                                            <option value="已完成">已完成</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-purple-600 text-sm">尚無任務</p>
                                    )}
                                </div>

                                {/* 新增任務表單 */}
                                <div className="border-t border-purple-200 pt-4">
                                    <h4 className="font-medium text-purple-700 mb-3">新增任務</h4>
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder="任務標題"
                                            className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            value={newTask.title}
                                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                        />
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="負責人"
                                                className="flex-1 px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                value={newTask.assignee}
                                                onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                                            />
                                            <select
                                                className="px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                value={newTask.priority}
                                                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                            >
                                                <option value="低">低</option>
                                                <option value="中">中</option>
                                                <option value="高">高</option>
                                            </select>
                                        </div>
                                        <button
                                            className="btn-primary w-full"
                                            onClick={() => handleAddTask(project.id)}
                                        >
                                            新增任務
                                        </button>
                                    </div>
                                </div>

                                {/* 文件列表 */}
                                {project.documents && project.documents.length > 0 && (
                                    <div className="border-t border-purple-200 pt-4 mt-4">
                                        <h4 className="font-medium text-purple-700 mb-2">專案文件</h4>
                                        <div className="space-y-1">
                                            {project.documents.map(doc => (
                                                <div key={doc.id} className="text-sm text-purple-600 bg-white bg-opacity-30 rounded p-2">
                                                    📄 {doc.name} - {doc.uploadedBy} ({formatDate(doc.timestamp)})
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 文件上傳 */}
                                <div className="border-t border-purple-200 pt-4 mt-4">
                                    <h4 className="font-medium text-purple-700 mb-2">上傳文件</h4>
                                    <div className="flex gap-2">
                                        <input
                                            type="file"
                                            className="flex-1 px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            onChange={(e) => handleUploadDocument(project.id, e.target.files[0])}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectManage;