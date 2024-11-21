package com.nanuri.rams.business.assessment.tb02.tb02020;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.TB02020DTO;
import com.nanuri.rams.business.common.vo.TB02020SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@RequestMapping("/TB02020S")
@RequiredArgsConstructor
@RestController
public class TB02020SAPIController {

  private final TB02020Service tb02020Service;
  
  //딜정보조회
  @GetMapping(value = "/getDealInfo")
  public List<TB02020DTO> getWfDealInfo(TB02020DTO dealInfo){
    return tb02020Service.getWfDealInfo(dealInfo);
  }
  
  //맵정보조회
  @GetMapping(value = "/getMapInfo")
  public List<TB02020DTO> getMapInfo(@RequestParam Map<String, String> mapInfo){
    return tb02020Service.getMapInfo(mapInfo);
  } 

  //맵이력조회
  @GetMapping(value = "/getMapHisInfo")
  public List<TB02020DTO> getMapHisInfo(@RequestParam Map<String, String> mapHisInfo){
    return tb02020Service.getMapHisInfo(mapHisInfo);
  } 
}
