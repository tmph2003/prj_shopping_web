using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prj_Ban_Quan_Ao.Models;

namespace Prj_Ban_Quan_Ao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoaiSanPhamsController : ControllerBase
    {
        private readonly DbQuanAoContext _context;

        public LoaiSanPhamsController(DbQuanAoContext context)
        {
            _context = context;
        }

        // GET: api/LoaiSanPhams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoaiSanPham>>> GetLoaiSanPhams()
        {
            return await _context.LoaiSanPhams.OrderByDescending(x => x.NgayTao).ToListAsync();
        }

        // GET: api/LoaiSanPhams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LoaiSanPham>> GetLoaiSanPham(Guid id)
        {
            var loaiSanPham = await _context.LoaiSanPhams.FindAsync(id);

            if (loaiSanPham == null)
            {
                return NotFound();
            }

            return loaiSanPham;
        }

        // PUT: api/LoaiSanPhams/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoaiSanPham(Guid id, LoaiSanPham loaiSanPham)
        {
            if (id != loaiSanPham.Id)
            {
                return BadRequest();
            }

            _context.Entry(loaiSanPham).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoaiSanPhamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/LoaiSanPhams
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LoaiSanPham>> PostLoaiSanPham(LoaiSanPham loaiSanPham)
        {
            _context.LoaiSanPhams.Add(loaiSanPham);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLoaiSanPham", new { id = loaiSanPham.Id }, loaiSanPham);
        }

        // DELETE: api/LoaiSanPhams/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoaiSanPham(Guid id)
        {
            var loaiSanPham = await _context.LoaiSanPhams.FindAsync(id);
            if (loaiSanPham == null)
            {
                return NotFound();
            }

            _context.LoaiSanPhams.Remove(loaiSanPham);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoaiSanPhamExists(Guid id)
        {
            return _context.LoaiSanPhams.Any(e => e.Id == id);
        }

        [HttpGet("GetSoLuongLoaiSanPham")]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetSoLuongLoaiSanPham()
        {
            var result = await (from sp in _context.SanPhams
                         join lsp in _context.LoaiSanPhams on sp.LoaiSanPhamId equals lsp.Id
                         group sp by lsp.TenLoai into g
                         select new
                         {
                             TenLoai = g.Key,
                             TongSoLuong = g.Count()
                         }).ToListAsync();


            //.GroupBy(sp => new { sp.LoaiSanPhamId, sp.LoaiSanPham.TenLoai })
            //.Select(g => new
            //{
            //    TenLoai = g.Key.TenLoai,
            //    TongSoLuong = g.Sum(sp => sp.SoLuong)
            //})
            //.ToListAsync();

            return result;
        }
    }
}
