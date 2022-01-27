package com.pierce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pierce.domain.Backlog;
import com.pierce.domain.ProjectTask;
import com.pierce.repositories.BacklogRepository;
import com.pierce.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private ProjectTaskRepository projectTaskRepository;

	public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
		//Exception project not found
		
		//tasks added to specific project backlog
		Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
		projectTask.setBacklog(backlog);
		
		// set up project sequence
		Integer backlogSequence = backlog.getPTSequence();
		backlogSequence++;
		
		//add sequence to project task
		projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
		projectTask.setProjectIdentifer(projectIdentifier);
		
		//default task priority
//		if(projectTask.getPriority() == 0 || projectTask.getPriority() == null) {
//			projectTask.setPriority(3);
//		}
		
		//default project status
		//enum statuses maybe later
		if(projectTask.getStatus() == "" || projectTask.getStatus() == null) {
			projectTask.setStatus("TO_DO");
		}
		
		//persist and return project task
		return projectTaskRepository.save(projectTask);
	}
}
