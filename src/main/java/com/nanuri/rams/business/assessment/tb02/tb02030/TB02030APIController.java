package com.nanuri.rams.business.assessment.tb02.tb02030;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.WfMapVo;
import com.nanuri.rams.com.dto.WFMapDTO;
import com.nanuri.rams.com.dto.WFStepDTO;
import com.nanuri.rams.com.dto.WorkFlowDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
@RequestMapping("/TB02030S")
@RequiredArgsConstructor
@RestController
public class TB02030APIController {
    
    private final TB02030Service tb02030Service;

    //========== WFMap 관련 ==========
    @GetMapping("/getWfMapInfo")
    public List<WFMapDTO> getWfMapInfo(String wfMapNm) {
        return tb02030Service.getWfMapInfo(wfMapNm);
    }

    //map insert
    @PostMapping("/insertWfMapInfo")
    public int insertWfMapInfo(@RequestBody List<WorkFlowDTO> insertInfo){
        return tb02030Service.insertWfMapInfo(insertInfo);
    }

    //map delete
    @DeleteMapping("/deleteWfMapInfo")
    public int deleteWfMapInfo(@RequestBody List<String>deleteInfo){
        return tb02030Service.deleteWfMapInfo(deleteInfo);
    }

    @PutMapping("/updateWfMapInfo")
    public int updateWfMapInfo(@RequestBody List<WfMapVo> updateInfo){
        return tb02030Service.updateWfMapInfo(updateInfo);
    }

    //========== WF STEP 관련 ========== 
    @GetMapping("/getWfStepInfo")
    public List<WorkFlowDTO> getWfStepInfo(String wfMapId) {
        return tb02030Service.getWfStepInfo(wfMapId);
    }
    
    @PostMapping("/insertWfStepInfo")
    public int insertWfStepInfo(@RequestBody List<WorkFlowDTO> insertInfo){
        return tb02030Service.wfStepRgst(insertInfo);
    }

    @DeleteMapping("/deleteWfStepInfo")
    public int deleteWfStepInfo(@RequestBody List<WFStepDTO>deleteInfo){
        return tb02030Service.deleteWfStepInfo(deleteInfo);
    }

    @PutMapping("/updateWfStepInfo")
    public int updateWStepInfo(@RequestBody List<WFStepDTO>  updateInfo){
        return tb02030Service.updateWStepInfo(updateInfo);
    }

}
