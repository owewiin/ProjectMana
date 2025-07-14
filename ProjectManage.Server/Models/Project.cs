namespace ProjectManage.Server.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Budget { get; set; }
        public decimal Spent { get; set; }
        public int Progress { get; set; }
        public string Status { get; set; } = "進行中";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public List<ProjectTask> Tasks { get; set; } = new();
        public List<Document> Documents { get; set; } = new();
    }

    public class ProjectTask
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Status { get; set; } = "待辦";
        public string Assignee { get; set; } = string.Empty;
        public string Priority { get; set; } = "中";
        public int ProjectId { get; set; }
        public Project Project { get; set; } = null!;
    }

    public class Document
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string UploadedBy { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public int ProjectId { get; set; }
        public Project Project { get; set; } = null!;
    }

    // DTOs
    public class CreateTaskDto
    {
        public string Title { get; set; } = string.Empty;
        public string Assignee { get; set; } = string.Empty;
        public string Priority { get; set; } = "中";
    }

    public class UploadDocumentDto
    {
        public string Name { get; set; } = string.Empty;
        public string UploadedBy { get; set; } = string.Empty;
    }
}