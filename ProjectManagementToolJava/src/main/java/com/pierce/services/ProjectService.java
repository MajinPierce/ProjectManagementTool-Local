package com.pierce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pierce.domain.Backlog;
import com.pierce.domain.Project;
import com.pierce.domain.User;
import com.pierce.exceptions.ProjectIdException;
import com.pierce.repositories.BacklogRepository;
import com.pierce.repositories.ProjectRepository;
import com.pierce.repositories.UserRepository;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
    private UserRepository userRepository;
	
	public Project saveOrUpdateProject(Project project, String username) {
		try {
			User user = userRepository.findByUsername(username);
			project.setUser(user);
            project.setProjectLeader(user.getUsername());
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			
			if(project.getId() == null) {
				Backlog backlog = new Backlog();
				project.setBacklog(backlog);
				backlog.setProject(project);
				backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			}
			
			if(project.getId() != null) {
				project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier()));
			}
			return projectRepository.save(project);
		} catch (Exception e) {
			throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists");
		}
	}
	
	public Project updateProject(String projectId, Project newProjectInfo) {
		Project project = findProjectByIdentifier(projectId.toUpperCase());
		
		if(newProjectInfo.getProjectName() != null) {
			project.setProjectName(newProjectInfo.getProjectName());
		}
		if(newProjectInfo.getDescription() != null) {
			project.setDescription(newProjectInfo.getDescription());
		}
		if(newProjectInfo.getStartDate() != null) {
			project.setStartDate(newProjectInfo.getStartDate());
		}
		if(newProjectInfo.getEndDate() != null) {
			project.setEndDate(newProjectInfo.getEndDate());
		}
		
		return projectRepository.save(project);
	}
	
	public Project findProjectByIdentifier(String projectId) {
		
		Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
		
		if(project == null) {
			throw new ProjectIdException("Project ID '" + projectId + "' does not exist");
		}
		
		return project;
	}
	
	public Iterable<Project> findAllProjects(){
		return projectRepository.findAll();
	}
	
	public void deleteProjectByIdentifier(String projectId) {
		Project project = projectRepository.findByProjectIdentifier(projectId);
		
		if(project == null) {
			throw new ProjectIdException("Cannot delete project with ID '" + projectId + "'. This project does not exist.");
		}
		
		projectRepository.delete(project);
	}
}
