package com.pierce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pierce.domain.Project;
import com.pierce.exceptions.ProjectIdException;
import com.pierce.repositories.ProjectRepository;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;
	
	public Project saveOrUpdateProject(Project project) {
		try {
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
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
