package com.pierce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pierce.domain.Backlog;
import com.pierce.domain.Project;
import com.pierce.domain.ProjectTask;
import com.pierce.exceptions.ProjectNotFoundException;
import com.pierce.repositories.BacklogRepository;
import com.pierce.repositories.ProjectRepository;
import com.pierce.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	
	@Autowired
	private  ProjectRepository projectRepository;

	public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
		//Exception project not found
		try {
			//tasks added to specific project backlog
			Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
			projectTask.setBacklog(backlog);
			
			// set up project sequence
			Integer backlogSequence = backlog.getPTSequence();
			backlogSequence++;
			backlog.setPTSequence(backlogSequence);
			
			//add sequence to project task
			projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
			projectTask.setProjectIdentifier(projectIdentifier);
			
			//default task priority
			if(projectTask.getPriority() == null) {
				projectTask.setPriority(3);
			}
			
			//default project status
			//enum statuses maybe later
			if(projectTask.getStatus() == "" || projectTask.getStatus() == null) {
				projectTask.setStatus("TO_DO");
			}
			
			//persist and return project task
			return projectTaskRepository.save(projectTask);
		} catch(Exception e) {
			throw new ProjectNotFoundException("Project ID '" + projectIdentifier + "' not found");
		}
	}
	
	public Iterable<ProjectTask> findBacklogById(String id){
		Project project = projectRepository.findByProjectIdentifier(id);

        if(project==null){
            throw new ProjectNotFoundException("Project ID '"+ id +"' not found");
        }
		
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }
	
	public ProjectTask findPTByProjectSequence(String backlog_id, String pt_id){
		
		Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
		
		if(backlog==null) {
			throw  new ProjectNotFoundException("Project ID '" + backlog_id + "' not found");
		}
		
		ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);
		
		if(projectTask == null) {
			throw  new ProjectNotFoundException("Project task '" + pt_id + "' not found in project '" + backlog_id + "'");
		}
		
		if(!projectTask.getProjectIdentifier().equals(backlog_id)) {
			throw new ProjectNotFoundException("Project task '" + pt_id + "' not found in project '" + backlog_id + "'");
		}

        return projectTask;
    }
}
