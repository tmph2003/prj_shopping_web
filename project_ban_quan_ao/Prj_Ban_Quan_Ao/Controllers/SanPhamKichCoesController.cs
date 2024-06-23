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
    public class SanPhamKichCoesController : ControllerBase
    {
        private readonly DbQuanAoContext _context;

        public SanPhamKichCoesController(DbQuanAoContext context)
        {
            _context = context;
        }

        // GET: api/SanPhamKichCoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanPhamKichCo>>> GetSanPhamKichCos()
        {
            return await _context.SanPhamKichCos.ToListAsync();
        }

        // GET: api/SanPhamKichCoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SanPhamKichCo>> GetSanPhamKichCo(Guid id)
        {
            var sanPhamKichCo = await _context.SanPhamKichCos.FindAsync(id);

            if (sanPhamKichCo == null)
            {
                return NotFound();
            }

            return sanPhamKichCo;
        }

        // PUT: api/SanPhamKichCoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSanPhamKichCo(Guid id, SanPhamKichCo sanPhamKichCo)
        {
            if (id != sanPhamKichCo.Id)
            {
                return BadRequest();
            }

            _context.Entry(sanPhamKichCo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SanPhamKichCoExists(id))
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


        [HttpGet("getkichcosanpham/{idSanPham}")]
        public IActionResult GetKichCoSanPham(string idSanPham)
        {
            var query =     (
                            from kcsp in _context.SanPhamKichCos
                            where kcsp.SanPhamId.ToString() == idSanPham
                            group new { kcsp } by new { kcsp.KichCo, kcsp.SanPhamId, kcsp.Mau } into g
                            select new
                            {
                                SanPham_id = g.Key.SanPhamId,
                                kichCo = g.Key.KichCo,
                                soLuong = g.Sum(x => x.kcsp.SoLuong),
                                mau = g.Key.Mau
                            }
);
            return Ok(query);
        }

        // POST: api/SanPhamKichCoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SanPhamKichCo>> PostSanPhamKichCo(SanPhamKichCo sanPhamKichCo)
        {
            _context.SanPhamKichCos.Add(sanPhamKichCo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSanPhamKichCo", new { id = sanPhamKichCo.Id }, sanPhamKichCo);
        }

        // DELETE: api/SanPhamKichCoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSanPhamKichCo(Guid id)
        {
            var sanPhamKichCo = await _context.SanPhamKichCos.FindAsync(id);
            if (sanPhamKichCo == null)
            {
                return NotFound();
            }

            _context.SanPhamKichCos.Remove(sanPhamKichCo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SanPhamKichCoExists(Guid id)
        {
            return _context.SanPhamKichCos.Any(e => e.Id == id);
        }
    }
}
