package com.aux.spring_app.confession;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfessionRepository extends JpaRepository<Confession, Long> {
    Page<Confession> findAllByOrderByIdDesc(Pageable pageable);
}
