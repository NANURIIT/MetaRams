package com.nanuri.rams.business.assessment.tb02.tb02020;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.TB02020Mapper;
import com.nanuri.rams.business.common.vo.TB02020SVO;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TB02020ServiceImpl implements TB02020Service {

  private final TB02020Mapper tb02020Mp;

  // 딜정보조회
  @Override
  public List<TB02020SVO> getWfDealInfo(TB02020SVO dealInfo) {
    
    List<TB02020SVO> dealList = tb02020Mp.getWfDealInfo(dealInfo);
    return dealList;
  }  

  // 맵정보조회
  @Override
  public List<TB02020SVO> getMapInfo(Map<String, String> mapInfo) {
    
    List<TB02020SVO> mapList = tb02020Mp.getMapInfo(mapInfo);
    return mapList;
  }

  @Override
  public List<TB02020SVO> getMapHisInfo(TB02020SVO dealInfo) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'getMapHisInfo'");
  }  
}
