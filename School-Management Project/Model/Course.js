﻿/*** @author admin*/(function(){    var    __Course 				= model.Course = {},    __events				= __Course.events	= new __myNameSpace.Model.User.Events(),    ROLES					= __myNameSpace.ROLES,    directoryROLES			= __myNameSpace.DirectoryROLES;	__Course.nbr_teachers = {		onGet:function(){			return this.ttTeachers.length;		}	}	__Course.nbr_groups = {		onGet:function(){			return this.groups.length;		}	}	    __events.onRestrictingQuery = function(){    	var        sessionRef	= currentSession(),        theUser;		        switch(true){            case sessionRef.belongsTo(directoryROLES.RECORDOFFICER)	:                return this.all().orderBy('name');            case sessionRef.belongsTo(directoryROLES.TEACHER) && typeof sessionStorage.ID != 'undefined' :                var                theUser	= ds.Teacher(sessionStorage.ID);				                return theUser.courses.orderBy('name');            case sessionRef.belongsTo(directoryROLES.STUDENT) && typeof sessionStorage.ID != 'undefined' :                var                theUser	= ds.Student(sessionStorage.ID);                                if(theUser.studyGroup){                	return theUser.studyGroup.courses.orderBy('name');                }                else{                	return this.createEntityCollection();                }            case sessionRef.belongsTo(directoryROLES.PARENT) && typeof sessionStorage.ID != 'undefined' :                var                theUser	= ds.parent(sessionStorage.ID);				                return theUser.getCourses().orderBy('name');        }		        return this.createEntityCollection();    };	    __events.onSave = function(){        ds.Log.push(__myNameSpace.LOG.getOperation(this , 'save'));    }	    __events.onRemove = function(){        ds.Log.push(__myNameSpace.LOG.getOperation(this , 'remove'));    }})();